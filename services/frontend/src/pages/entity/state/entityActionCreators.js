import {
  ENTITY_PROPERTY_ADDED,
  ENTITY_PROPERTY_REMOVED,
  ENTITY_PROPERTY_CHANGED,
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
