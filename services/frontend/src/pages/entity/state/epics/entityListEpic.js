/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { ENTITY_LIST_REQUEST } from '../entityActionTypes';
import { entityListSuccess, entityListFailure } from '../entityActionCreators';

const printError = err => err.xhr && err.xhr.response || err.stack;

export default actions$ => actions$.ofType(ENTITY_LIST_REQUEST).switchMap(() =>
  ajax({
    url: `${process.env.REACT_APP_BACKEND_URL}/api/entities`,
    method: 'GET',
    crossDomain: true,
    createXHR: () => new XMLHttpRequest(),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
    .map(e => entityListSuccess(e.response))
    .catch(err => Observable.of(entityListFailure(printError(err)))));
