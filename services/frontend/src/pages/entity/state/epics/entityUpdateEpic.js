/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { ENTITY_UPDATE_REQUEST } from '../entityActionTypes';
import {
  entityUpdateSuccess,
  entityUpdateFailure,
  entityListRequest,
  entityModeChange,
} from '../entityActionCreators';

const entityUpdateEpic = actions$ => actions$.ofType(ENTITY_UPDATE_REQUEST).switchMap(({ entity }) =>
  ajax({
    url: `${process.env.REACT_APP_BACKEND_URL}/api/entities/${entity.id}`,
    method: 'PUT',
    crossDomain: true,
    createXHR: () => new XMLHttpRequest(),
    body: entity,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
    .mergeMap(e => [
      entityUpdateSuccess(e.response),
      entityModeChange('VIEW'),
      entityListRequest(),
    ])
    .catch(err => Observable.of(entityUpdateFailure(err.xhr.response))));

export default entityUpdateEpic;
