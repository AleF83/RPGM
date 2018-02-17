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

import { createEmptyEntity } from './entityUtils';

export const initialState = {
  current: null,
  currentOriginal: null,
  list: [],
  mode: 'VIEW',
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ENTITY_LIST_REQUEST:
      return { ...state, messages: [...state.messages, 'Loading entities...'] };

    case ENTITY_LIST_SUCCESS:
      return {
        ...state,
        list: action.entities,
        messages: [...state.messages, `${action.entities.length} entities loaded.`],
      };

    case ENTITY_LIST_FAILURE:
      return {
        ...state,
        list: [],
        messages: [...state.messages, `Failed to load entity list: ${action.message}`],
      };

    case ENTITY_LOAD_REQUEST:
      return { ...state, messages: [...state.messages, `Loading ${action.entityId}`] };

    case ENTITY_LOAD_SUCCESS:
      return {
        ...state,
        current: action.entity,
        currentOriginal: JSON.parse(JSON.stringify(action.entity)),
        messages: [...state.messages, `Entity loaded: ${action.entity.name}`],
      };

    case ENTITY_LOAD_FAILURE:
      return {
        ...state,
        current: null,
        currentOriginal: null,
        messages: [...state.messages, `Failed to load entity: ${action.message}`],
      };

    case ENTITY_CREATE_REQUEST:
      return { ...state, messages: [...state.messages, `Creating ${action.entity.name}...`] };

    case ENTITY_CREATE_SUCCESS:
      return {
        ...state,
        current: action.entity,
        currentOriginal: JSON.parse(JSON.stringify(action.entity)),
        messages: [...state.messages, `New entity created: ${action.entity.name}`],
      };

    case ENTITY_CREATE_FAILURE:
      return {
        ...state,
        messages: [...state.messages, `Failed to create new entity: ${action.message}`],
      };

    case ENTITY_UPDATE_REQUEST:
      return { ...state, messages: [...state.messages, `Updating ${action.entity.name}...`] };

    case ENTITY_UPDATE_RESET:
      return { ...state, current: state.currentOriginal };

    case ENTITY_UPDATE_SUCCESS:
      return {
        ...state,
        current: action.entity,
        currentOriginal: JSON.parse(JSON.stringify(action.entity)),
        messages: [...state.messages, `The entity was updated: ${action.entity.name}`],
      };

    case ENTITY_UPDATE_FAILURE:
      return {
        ...state,
        messages: [...state.messages, `Failed to update entity: ${action.message}`],
      };

    case ENTITY_DELETE_REQUEST:
      return { ...state, messages: [...state.messages, `Deleting ${action.entityId}...`] };

    case ENTITY_DELETE_SUCCESS:
      return { ...state, messages: [...state.messages, 'The entity was deleted.'] };

    case ENTITY_DELETE_FAILURE:
      return {
        ...state,
        messages: [...state.messages, `Failed to delete entity: ${action.message}`],
      };

    case ENTITY_MODE_CHANGE:
      return {
        ...state,
        mode: action.mode,
        ...({ NEW: { current: createEmptyEntity() }, LIST: { current: null } })[action.mode],
      };

    case ENTITY_PROPERTY_CHANGE:
      return { ...state, current: { ...state.current, [action.propName]: action.propValue } };

    default:
      return state;
  }
};
