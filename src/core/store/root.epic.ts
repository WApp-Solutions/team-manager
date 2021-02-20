import { combineEpics } from 'redux-observable';
import { demoAddEpic$, demoDelayEpic$ } from './demo/demo.epics';

export const rootEpic$ = combineEpics(demoDelayEpic$, demoAddEpic$);
