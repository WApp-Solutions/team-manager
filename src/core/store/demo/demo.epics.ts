import { Epic, ofType } from 'redux-observable';
import { PayloadAction } from '@reduxjs/toolkit';
import { delay, map } from 'rxjs/operators';
import { demoActions } from './demo.slice';
import { Demo } from './types';
import { RealTimeDatabase } from '../../firebase/real-time-database';

export const demoDelayEpic$: Epic = (action$) =>
  action$.pipe(
    ofType(demoActions.addDemo),
    delay(1),
    map((action: PayloadAction<Demo>) => demoActions.addDemoFinished({ ...action.payload, isLoading: false })),
  );

export const demoAddEpic$: Epic = (action$) =>
  action$.pipe(
    ofType(demoActions.triggerAddDemo),
    map((action: PayloadAction<string>) => {
      const t = RealTimeDatabase.getInstance();
      t.addDemo(action.payload);
      return demoActions.finishAddDemo('');
    }),
  );
