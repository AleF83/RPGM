import { combineEpics } from 'redux-observable';
import authProvidersEpic from './authProvidersEpic';
import authDiscoverEpic from './authDiscoverEpic';

export default combineEpics(authProvidersEpic, authDiscoverEpic);
