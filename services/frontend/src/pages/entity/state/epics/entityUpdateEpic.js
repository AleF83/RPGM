/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { EditorState } from 'draft-js';
import { stateToMarkdown } from 'draft-js-export-markdown';
import { stateFromMarkdown } from 'draft-js-import-markdown';

import { ENTITY_UPDATE_REQUEST } from '../entityActionTypes';
import {
  entityUpdateSuccess,
  entityUpdateFailure,
  entityListRequest,
  entityModeChange,
} from '../entityActionCreators';

const entityUpdateEpic = actions$ => actions$
  .ofType(ENTITY_UPDATE_REQUEST)
  .map(({ entity }) => ({
    ...entity,
    description: stateToMarkdown(entity.description.getCurrentContent()),
  }))
  .switchMap(entity =>
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/entities/${entity.id}`,
      method: 'PUT',
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
        entityUpdateSuccess(ent),
        entityModeChange('VIEW'),
        entityListRequest(),
      ])
      .catch(err => Observable.of(entityUpdateFailure(err.xhr.response))));

export default entityUpdateEpic;
