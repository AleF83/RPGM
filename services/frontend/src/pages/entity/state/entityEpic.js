import 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { ENTITY_SAVE_REQUEST } from './entityActionTypes';
import { entitySavedSuccess } from './entityActionCreators';

export const entitySaveEpic = actions$ =>
  actions$
    .ofType(ENTITY_SAVE_REQUEST)
    .switchMap(() => ajax.get('/api/entity/1').map(() => entitySavedSuccess));

export const a = 3;
