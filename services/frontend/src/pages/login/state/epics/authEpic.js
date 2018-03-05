import { combineEpics } from 'redux-observable';
import authProvidersEpic from './authProvidersEpic';

export default combineEpics(authProvidersEpic);
