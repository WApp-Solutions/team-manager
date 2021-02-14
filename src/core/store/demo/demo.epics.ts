import { Epic, ofType } from 'redux-observable';
import { PayloadAction } from '@reduxjs/toolkit';
import { delay, map } from 'rxjs/operators';
import { demoActions } from './demo.slice';
import { Demo } from './types';

export const demoDelayEpic$: Epic = (action$) =>
  action$.pipe(
    ofType(demoActions.addDemo),
    delay(3000),
    map((action: PayloadAction<Demo>) => demoActions.addDemoFinished({ ...action.payload, isLoading: false })),
  );
