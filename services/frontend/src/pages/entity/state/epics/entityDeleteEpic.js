/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { ENTITY_DELETE_REQUEST } from '../entityActionTypes';
import {
  entityDeleteSuccess,
  entityDeleteFailure,
  entityListRequest,
  entityModeChange,
} from '../entityActionCreators';

import { printError } from '../../../../common/utils';

export default actions$ =>
  actions$.ofType(ENTITY_DELETE_REQUEST).switchMap(({ entityId }) =>
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/entities/${entityId}`,
      method: 'DELETE',
      crossDomain: true,
      createXHR: () => new XMLHttpRequest(),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
      .mergeMap(() => [
        entityDeleteSuccess(entityId),
        entityListRequest(),
        entityModeChange('LIST'),
      ])
      .catch(err => Observable.of(entityDeleteFailure(printError(err)))));
