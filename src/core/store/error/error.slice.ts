import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMErrorMessage, TMErrorPayload, TMErrorSlice, TMErrorType } from './error.types';

const initialState: TMErrorSlice = {
  [TMErrorType.DATABASE]: [],
};

export const errorSlice = createSlice({
  name: 'Error',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<TMErrorPayload>) => {
      state[action.payload.type].push({
        errorMessage: TMErrorMessage[action.payload.type],
        originalError: {
          message: action.payload.error.message,
          name: action.payload.error.name,
          stack: action.payload.error.stack,
        },
        occursAt: new Date(),
      });
    },
  },
});

export const { actions: errorActions, reducer: errorReducer } = errorSlice;
