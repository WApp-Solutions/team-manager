import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './firebase.config';
import { AppStore } from '../store/app-store';
import { errorActions } from '../store/error/error.slice';
import { TMErrorType } from '../store/error/error.types';

const app = firebase.initializeApp(firebaseConfig);

let t;
try {
  t = firebase.database(app);
} catch (e: unknown) {
  AppStore.dispatch(errorActions.addError({ type: TMErrorType.DATABASE, error: e as Error }));
}

export const realTimeDatabase = t;

export default firebase;
