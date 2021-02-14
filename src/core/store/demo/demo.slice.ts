import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Demo } from './types';

export type DemoSlice = Demo[];

const initialState: DemoSlice = [];

/**
 *  HEADS UP: This is just a showcase.
 *  Take that as an example for real slices!
 */
const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Demo[]>) => action.payload,
    addDemo: (state, action: PayloadAction<Demo>) => {
      // set isLoading to true as an epic will trigger finished action
      state.push({ ...action.payload, isLoading: true });
    },
    addDemoFinished: (state, action: PayloadAction<Demo>) => {
      const index = state.findIndex((d) => d.id === action.payload.id);

      if (index >= 0) {
        // eslint-disable-next-line no-param-reassign
        state[index] = action.payload;
      }

      return state;
    },
    updateDemo: (state, action: PayloadAction<Demo>) => {
      const index = state.findIndex((d) => d.id === action.payload.id);
      if (index >= 0) {
        // eslint-disable-next-line no-param-reassign
        state[index] = action.payload;
      }

      return state;
    },
    removeDemo: (state, action: PayloadAction<Demo>) => {
      const index = state.findIndex((d) => d.id === action.payload.id);
      if (index >= 0) {
        // eslint-disable-next-line no-param-reassign
        state.splice(index, 1);
      }

      return state;
    },
    // Dummy for async scenario
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    triggerAddDemo: (state, _: PayloadAction<string>) => state,
    // Dummy for async scenario
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    finishAddDemo: (state, _: PayloadAction<string>) => state,
  },
});

export const { actions: demoActions, caseReducers: demoCaseReducers, name: demoName, reducer: demoReducer } = demoSlice;
