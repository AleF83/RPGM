/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { EditorState } from 'draft-js';
import { stateToMarkdown } from 'draft-js-export-markdown';
import { stateFromMarkdown } from 'draft-js-import-markdown';

import { ENTITY_CREATE_REQUEST } from '../entityActionTypes';
import {
  entityCreateSuccess,
  entityCreateFailure,
  entityListRequest,
  entityModeChange,
} from '../entityActionCreators';

const printError = err => err.xhr && err.xhr.response || err.stack;

export default actions$ => actions$
  .ofType(ENTITY_CREATE_REQUEST)
  .map(({ entity }) => ({
    ...entity,
    description: stateToMarkdown(entity.description.getCurrentContent()),
  }))
  .switchMap(entity =>
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/entities`,
      method: 'POST',
      crossDomain: true,
      createXHR: () => new XMLHttpRequest(),
      body: entity,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
      .map(e => e.response)
      .map(ent => ({
        ...ent,
        description: EditorState.createWithContent(stateFromMarkdown(ent.description)),
      }))
      .mergeMap(ent => [
        entityCreateSuccess(ent),
        entityModeChange('VIEW'),
        entityListRequest(),
      ])
      .catch(err => Observable.of(entityCreateFailure(printError(err)))));
