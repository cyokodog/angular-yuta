import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as firebase from 'firebase/app';
import { Auth } from './../../models/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthApiService {

  auth$ = new BehaviorSubject<Auth>(Auth.blank());
  private authStateChangeEventUnsubscription;
  private _auth: Auth;

  constructor(
    public afAuth: AngularFireAuth,
  ) {
  }

  signIn() {
    if (this.authStateChangeEventUnsubscription) {
      this.authStateChangeEventUnsubscription();
    }
    const authProvider = new firebase.auth.GoogleAuthProvider();
    this.authStateChangeEventUnsubscription = this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.auth = new Auth({
          authenticated: true,
          userName: user.displayName,
          photoURL: user.photoURL
        });
        return;
      }
      this.afAuth.auth.signInWithRedirect(authProvider);
    });

    this.detectChangedAuthState();
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  private detectChangedAuthState() {
    console.log('--detectChangedAuthState');
    if (!this.auth) {
      setTimeout(_ => this.detectChangedAuthState(), 1000);
    }
  }

  private set auth(v: Auth) {
    this._auth = v;
    this.auth$.next(this._auth);
  }

  private get auth(): Auth {
    return this._auth;
  }

}
