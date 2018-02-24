import { METADATA_SUCCESS } from './metadataActionTypes';

export const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case METADATA_SUCCESS:
      return { ...state, [action.metadataType]: action.metadata };
    default:
      return state;
  }
};
