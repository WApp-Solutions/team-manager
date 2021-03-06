import { combineReducers } from '@reduxjs/toolkit';
import { demoReducer } from './demo/demo.slice';
import { AppState } from './app-state';

export const rootReducer = combineReducers<AppState>({
  demo: demoReducer,
});
