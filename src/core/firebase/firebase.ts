import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { firebaseConfig } from './firebase.config';
import { AppStore } from '../store/app-store';
import { errorActions } from '../store/error/error.slice';
import { TMErrorType } from '../store/error/error.types';

const firebaseApp = firebase.initializeApp(firebaseConfig);

let t;
try {
  t = firebase.database(firebaseApp);
} catch (e: unknown) {
  AppStore.dispatch(errorActions.addError({ type: TMErrorType.DATABASE, error: e as Error }));
}

export const realTimeDatabase = t;

export const firebaseAuthService = firebaseApp.auth();

export default firebase;
