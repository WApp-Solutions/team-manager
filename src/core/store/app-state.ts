import { DemoSlice } from './demo/demo.slice';
import { TMErrorSlice } from './error/error.types';

export interface AppState {
  demo: DemoSlice;
  error: TMErrorSlice;
}
