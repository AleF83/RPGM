/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { ENTITY_LOAD_REQUEST } from '../entityActionTypes';
import { entityLoadSuccess, entityLoadFailure } from '../entityActionCreators';

const entityLoadEpic = actions$ =>
  actions$.ofType(ENTITY_LOAD_REQUEST).switchMap(({ entityId }) =>
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/entities/${entityId}`,
      method: 'GET',
      crossDomain: true,
      createXHR: () => new XMLHttpRequest(),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .map(e => entityLoadSuccess(e.response))
      .catch(err => Observable.of(entityLoadFailure(err.xhr.response))));

export default entityLoadEpic;
