import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../app-state';

const selectSelf = (state: AppState) => state.demo;

const selectDemoId = (_: AppState, demoId: string) => demoId;

export const selectDemoById = createSelector(selectSelf, selectDemoId, (state, demoId) =>
  Object.values(state).find((d) => d.id === demoId),
);

export type RTSelectDemoById = ReturnType<typeof selectDemoById>;
