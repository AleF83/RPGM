import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

const rawToEditorState = raw => EditorState.createWithContent(convertFromRaw(raw));
const editorStateToRaw = state => convertToRaw(state.getCurrentContent());

export const createEmptyEntity = () => ({
  id: '',
  name: '',
  summary: '',
  description: EditorState.createEmpty(),
});

export const backupEntity = entity => ({
  ...entity,
  rawDescription: editorStateToRaw(entity.description),
});

export const restoreEntity = entityBackup => ({
  ...entityBackup,
  description: rawToEditorState(entityBackup.rawDescription),
});
