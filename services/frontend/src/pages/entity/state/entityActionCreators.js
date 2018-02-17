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

export const entityListRequest = () => ({ type: ENTITY_LIST_REQUEST });

export const entityListSuccess = entities => ({ type: ENTITY_LIST_SUCCESS, entities });

export const entityListFailure = message => ({ type: ENTITY_LIST_FAILURE, message });

export const entityLoadRequest = (entityId, mode = 'VIEW') => ({
  type: ENTITY_LOAD_REQUEST,
  entityId,
  mode,
});

export const entityLoadSuccess = entity => ({ type: ENTITY_LOAD_SUCCESS, entity });

export const entityLoadFailure = message => ({ type: ENTITY_LOAD_FAILURE, message });

export const entityCreateRequest = entity => ({ type: ENTITY_CREATE_REQUEST, entity });

export const entityCreateSuccess = entity => ({ type: ENTITY_CREATE_SUCCESS, entity });

export const entityCreateFailure = message => ({ type: ENTITY_CREATE_FAILURE, message });

export const entityUpdateRequest = entity => ({ type: ENTITY_UPDATE_REQUEST, entity });

export const entityUpdateReset = () => ({ type: ENTITY_UPDATE_RESET });

export const entityUpdateSuccess = entity => ({ type: ENTITY_UPDATE_SUCCESS, entity });

export const entityUpdateFailure = message => ({ type: ENTITY_UPDATE_FAILURE, message });

export const entityDeleteRequest = entityId => ({ type: ENTITY_DELETE_REQUEST, entityId });

export const entityDeleteSuccess = entityId => ({ type: ENTITY_DELETE_SUCCESS, entityId });

export const entityDeleteFailure = message => ({ type: ENTITY_DELETE_FAILURE, message });

export const entityModeChange = mode => ({ type: ENTITY_MODE_CHANGE, mode });

export const entityPropertyChange = (propName, propValue) => ({
  type: ENTITY_PROPERTY_CHANGE,
  propName,
  propValue,
});
