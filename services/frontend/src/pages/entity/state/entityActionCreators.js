import {
  ENTITY_PROPERTY_ADDED,
  ENTITY_PROPERTY_REMOVED,
  ENTITY_PROPERTY_CHANGED,
  ENTITY_SAVE_REQUEST,
  ENTITY_SAVE_SUCCESS,
  ENTITY_SAVE_FAILURE,
} from './entityActionTypes';

export const entityPropertyAdded = (propName, propValue) => ({
  type: ENTITY_PROPERTY_ADDED,
  propName,
  propValue,
});

export const entityPropertyRemoved = propName => ({
  type: ENTITY_PROPERTY_REMOVED,
  propName,
});

export const entityPropertyChanged = (propName, propValue) => ({
  type: ENTITY_PROPERTY_CHANGED,
  propName,
  propValue,
});

export const entitySavedRequest = () => ({
  type: ENTITY_SAVE_REQUEST,
});

export const entitySavedSuccess = message => ({
  type: ENTITY_SAVE_SUCCESS,
  message,
});

export const entitySavedFailure = () => ({
  type: ENTITY_SAVE_FAILURE,
});
