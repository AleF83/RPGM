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
} from './entityActionTypes';

export const initialState = {
  current: null,
  list: [],
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ENTITY_LIST_REQUEST:
      return {
        ...state,
        current: null,
        message: 'Loading...',
      };

    case ENTITY_LIST_SUCCESS:
      return {
        ...state,
        current: (action.entities.length > 0 && action.entities[0]) || null,
        list: action.entities,
        message: `${action.entities.length} entities loaded.`,
      };

    case ENTITY_LIST_FAILURE:
      return {
        ...state,
        current: null,
        list: [],
        message: `Failed to load entity list: ${action.message}`,
      };

    case ENTITY_LOAD_REQUEST:
      return state;

    case ENTITY_LOAD_SUCCESS:
      return {
        ...state,
        current: action.entity,
      };

    case ENTITY_LOAD_FAILURE:
      return {
        ...state,
        current: null,
        message: action.message,
      };

    case ENTITY_CREATE_REQUEST:
      return state;

    case ENTITY_CREATE_SUCCESS:
      return {
        ...state,
        message: action.message,
      };

    case ENTITY_CREATE_FAILURE:
      return {
        ...state,
        message: action.message,
      };

    case ENTITY_UPDATE_REQUEST:
      return state;

    case ENTITY_UPDATE_SUCCESS:
      return state;

    case ENTITY_UPDATE_FAILURE:
      return {
        ...state,
        message: action.message,
      };

    case ENTITY_DELETE_REQUEST:
      return state;

    case ENTITY_DELETE_SUCCESS:
      return {
        ...state,
        list: state.list.filter(e => e.id !== action.entityId),
        current: state.current.id === action.entityId ? null : state.current,
      };

    case ENTITY_DELETE_FAILURE:
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};
