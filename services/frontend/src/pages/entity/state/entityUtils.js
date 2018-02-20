import { EditorState } from 'draft-js';

export const a = 1;

export const createEmptyEntity = () => ({
  id: '',
  name: '',
  summary: '',
  description: EditorState.createEmpty(),
});
