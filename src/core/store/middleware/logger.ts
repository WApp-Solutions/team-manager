/* eslint-disable no-console */
import { Action, Middleware } from '@reduxjs/toolkit';
import { AppState } from '../app-state';

const loggerMiddleware: Middleware<unknown, AppState> = (appStore) => (next) => (action: Action<unknown>) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', appStore.getState());
  console.groupEnd();
  return result;
};

export default loggerMiddleware;
