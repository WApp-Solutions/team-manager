import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from './middleware/logger';
import { epicMiddleware } from './middleware/epic';
import { rootReducer } from './root.reducer';

export const AppStore = configureStore({
  devTools: true,
  reducer: rootReducer,
  middleware: [loggerMiddleware, epicMiddleware],
});
