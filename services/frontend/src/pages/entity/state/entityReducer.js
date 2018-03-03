import {
  ENTITY_LIST_REQUEST,
  ENTITY_LIST_SUCCESS,
  ENTITY_LIST_FAILURE,
  ENTITY_LOAD_REQUEST,
  ENTITY_LOAD_SUCCESS,
  ENTITY_LOAD_FAILURE,
  ENTITY_CREATE_REQUEST,
  ENTITY_CREATE_SUCCESS,
  ENTITY_CREATE_FAILURE,
  ENTITY_UPDATE_REQUEST,
  ENTITY_UPDATE_SUCCESS,
  ENTITY_UPDATE_FAILURE,
  ENTITY_DELETE_REQUEST,
  ENTITY_DELETE_SUCCESS,
  ENTITY_DELETE_FAILURE,
  ENTITY_MODE_CHANGE,
  ENTITY_PROPERTY_CHANGE,
  ENTITY_UPDATE_RESET,
} from './entityActionTypes';

import { createEmptyEntity, backupEntity, restoreEntity } from '../entityUtils';

export const initialState = {
  current: null,
  currentBackup: null,
  list: [],
  mode: 'LIST',
  inProgress: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ENTITY_LIST_REQUEST:
      return { ...state, inProgress: true };

    case ENTITY_LIST_SUCCESS:
      return {
        ...state,
        list: action.entities,
        inProgress: false,
      };

    case ENTITY_LIST_FAILURE:
      return {
        ...state,
        list: [],
        inProgress: false,
      };

    case ENTITY_LOAD_REQUEST:
      return { ...state, inProgress: true };

    case ENTITY_LOAD_SUCCESS:
      return {
        ...state,
        current: action.entity,
        currentBackup: backupEntity(action.entity),
        inProgress: false,
      };

    case ENTITY_LOAD_FAILURE:
      return {
        ...state,
        current: null,
        currentBackup: null,
        inProgress: false,
      };

    case ENTITY_CREATE_REQUEST:
      return { ...state, inProgress: true };

    case ENTITY_CREATE_SUCCESS:
      return {
        ...state,
        current: action.entity,
        currentBackup: backupEntity(action.entity),
        inProgress: false,
      };

    case ENTITY_CREATE_FAILURE:
      return {
        ...state,
        inProgress: false,
      };

    case ENTITY_UPDATE_REQUEST:
      return { ...state, inProgress: true };

    // TODO: take care to EditorState copy
    case ENTITY_UPDATE_RESET:
      return { ...state, current: restoreEntity(state.currentBackup) };

    // TODO: take care to EditorState copy
    case ENTITY_UPDATE_SUCCESS:
      return {
        ...state,
        current: action.entity,
        currentBackup: backupEntity(action.entity),
        inProgress: false,
      };

    case ENTITY_UPDATE_FAILURE:
      return {
        ...state,
        inProgress: false,
      };

    case ENTITY_DELETE_REQUEST:
      return { ...state, inProgress: true };

    case ENTITY_DELETE_SUCCESS:
      return { ...state, inProgress: false };

    case ENTITY_DELETE_FAILURE:
      return {
        ...state,
        inProgress: false,
      };

    case ENTITY_MODE_CHANGE:
      return {
        ...state,
        mode: action.mode,
        ...{ NEW: { current: createEmptyEntity() }, LIST: { current: null } }[action.mode],
      };

    case ENTITY_PROPERTY_CHANGE:
      return { ...state, current: { ...state.current, [action.propName]: action.propValue } };

    default:
      return state;
  }
};
