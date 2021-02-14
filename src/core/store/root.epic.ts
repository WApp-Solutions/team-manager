import { combineEpics } from 'redux-observable';
import { demoDelayEpic$ } from './demo/demo.epics';

export const rootEpic$ = combineEpics(demoDelayEpic$);
