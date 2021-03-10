/* eslint-disable no-underscore-dangle */
import firebase from 'firebase/app';
import { firebaseAuthService } from './firebase';

export enum ProviderType {
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  PASSWORD = 'password',
}

export class Authenticator {
  private static instance: Authenticator;

  private _fbProvider: firebase.auth.FacebookAuthProvider | undefined;

  private _ghProvider: firebase.auth.GithubAuthProvider | undefined;

  public static getInstance(): Authenticator {
    if (!Authenticator.instance) {
      Authenticator.instance = new Authenticator();
    }
    return Authenticator.instance;
  }

  public static getCurrentUser(): firebase.User | null {
    return firebaseAuthService.currentUser;
  }

  public async signInWith(providerType: ProviderType): Promise<void> {
    let credentials: firebase.auth.UserCredential;
    try {
      switch (providerType) {
        case ProviderType.FACEBOOK:
          credentials = await firebaseAuthService.signInWithPopup(this.fbProvider);
          console.log(credentials.user?.getIdToken());
          break;
        case ProviderType.GITHUB:
          credentials = await firebaseAuthService.signInWithPopup(this.ghProvider);
          console.log(credentials.user);
          break;
        case ProviderType.PASSWORD:
          credentials = await firebaseAuthService.signInWithEmailAndPassword('test.test@test.com', 'testtest');
          console.log(credentials.user);
          break;
        default:
        // do nothing
      }
    } catch (e: unknown) {
      console.log(e);
    }
    return Promise.resolve();
  }

  get fbProvider(): firebase.auth.FacebookAuthProvider {
    if (!this._fbProvider) {
      this._fbProvider = new firebase.auth.FacebookAuthProvider();
      this._fbProvider.addScope('email');
      this._fbProvider.addScope('user_friends');
    }
    return this._fbProvider;
  }

  get ghProvider(): firebase.auth.GithubAuthProvider {
    if (!this._ghProvider) {
      this._ghProvider = new firebase.auth.GithubAuthProvider();
      this._ghProvider.addScope('user:email');
      this._ghProvider.addScope('read:user');
    }
    return this._ghProvider;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
}

/* eslint-enable no-underscore-dangle */
