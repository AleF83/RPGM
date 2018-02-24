/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { EditorState } from 'draft-js';
import { stateFromMarkdown } from 'draft-js-import-markdown';

import { ENTITY_LOAD_REQUEST } from '../entityActionTypes';
import { entityLoadSuccess, entityLoadFailure, entityModeChange } from '../entityActionCreators';

const printError = err => err.xhr && err.xhr.response || err.stack;

export default actions$ => actions$.ofType(ENTITY_LOAD_REQUEST).switchMap(({ entityId, mode }) =>
  ajax({
    url: `${process.env.REACT_APP_BACKEND_URL}/api/entities/${entityId}`,
    method: 'GET',
    crossDomain: true,
    createXHR: () => new XMLHttpRequest(),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
    .map(e => e.response)
    .map(entity => ({
      ...entity,
      description: EditorState.createWithContent(stateFromMarkdown(entity.description)),
    }))
    .mergeMap(entity => [entityLoadSuccess(entity), entityModeChange(mode)])
    .catch(err => Observable.of(entityLoadFailure(printError(err)))));
