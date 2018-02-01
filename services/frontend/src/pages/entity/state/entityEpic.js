import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { ENTITY_SAVE_REQUEST } from './entityActionTypes';
import { entitySavedSuccess, entitySavedFailure } from './entityActionCreators';

export const entitySaveEpic = actions$ =>
  actions$.ofType(ENTITY_SAVE_REQUEST).switchMap(() =>
    ajax
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/entity/1`)
      .map(() => entitySavedSuccess())
      .catch(() => Observable.of(entitySavedFailure())));

export const a = 3;
