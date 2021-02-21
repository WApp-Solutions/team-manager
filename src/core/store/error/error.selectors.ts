import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../app-state';
import { TMErrorType } from './error.types';

const selectSelf = (state: AppState) => state.error;

const selectSpecificError = (_: AppState, errorType: TMErrorType) => errorType;

export const selectLatestErrorByType = createSelector(
  selectSelf,
  selectSpecificError,
  (state, errorType) =>
    state[errorType].sort((a, b) => a.occursAt.getUTCMilliseconds() - b.occursAt.getUTCMilliseconds())[0],
);

export type RTSelectLatestErrorByType = ReturnType<typeof selectLatestErrorByType>;
