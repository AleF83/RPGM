import { combineEpics } from 'redux-observable';
import entityCreateEpic from './entityCreateEpic';
import entityLoadEpic from './entityLoadEpic';
import entityUpdateEpic from './entityUpdateEpic';
import entityDeleteEpic from './entityDeleteEpic';
import entityListEpic from './entityListEpic';

export default combineEpics(
  entityCreateEpic,
  entityLoadEpic,
  entityUpdateEpic,
  entityDeleteEpic,
  entityListEpic,
);
