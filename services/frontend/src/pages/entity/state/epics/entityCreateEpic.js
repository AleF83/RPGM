/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { ENTITY_CREATE_REQUEST } from '../entityActionTypes';
import { entityCreateSuccess, entityCreateFailure } from '../entityActionCreators';

const entityCreateEpic = actions$ =>
  actions$.ofType(ENTITY_CREATE_REQUEST).switchMap(({ entityCreationParams }) =>
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/entities`,
      method: 'POST',
      crossDomain: true,
      createXHR: () => new XMLHttpRequest(),
      body: entityCreationParams,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .map(e => entityCreateSuccess(e.response))
      .catch(err => Observable.of(entityCreateFailure(err.xhr.response))));

export default entityCreateEpic;
