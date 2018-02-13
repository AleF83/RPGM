/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { ENTITY_UPDATE_REQUEST } from '../entityActionTypes';
import { entityUpdateSuccess, entityUpdateFailure } from '../entityActionCreators';

const entityUpdateEpic = actions$ =>
  actions$.ofType(ENTITY_UPDATE_REQUEST).switchMap(({ entity }) =>
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/entities/${entity.id}`,
      method: 'PUT',
      crossDomain: true,
      createXHR: () => new XMLHttpRequest(),
      body: entity,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .map(e => entityUpdateSuccess(e.response))
      .catch(err => Observable.of(entityUpdateFailure(err.xhr.response))));

export default entityUpdateEpic;
