import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { ENTITY_SAVE_REQUEST } from './entityActionTypes';
import { entitySavedSuccess, entitySavedFailure } from './entityActionCreators';

export const entitySaveEpic = actions$ =>
  actions$.ofType(ENTITY_SAVE_REQUEST).switchMap(() =>
    ajax
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/entities`,
        {
          name: 'Aragorn',
          description:
            "Aragorn II, son of Arathorn is a fictional character from J. R. R. Tolkien's legendarium",
        },
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      )
      .map(e => entitySavedSuccess(e.response.name))
      .catch(err => Observable.of(entitySavedFailure(err.xhr.response))));

export const a = 3;
