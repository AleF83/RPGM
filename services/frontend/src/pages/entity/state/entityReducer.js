import {
  ENTITY_PROPERTY_ADDED,
  ENTITY_PROPERTY_REMOVED,
  ENTITY_PROPERTY_CHANGED,
} from './entityActionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ENTITY_PROPERTY_ADDED:
      return {
        ...state,
        [action.propName]: action.propValue,
      };
    case ENTITY_PROPERTY_REMOVED:
      return Object.keys(state).reduce(
        (newState, key) =>
          (key !== action.propName ? { ...newState, [key]: state[key] } : newState),
        {},
      );
    case ENTITY_PROPERTY_CHANGED:
      return {
        ...state,
        [action.propName]: action.propValue,
      };

    default:
      return state;
  }
};