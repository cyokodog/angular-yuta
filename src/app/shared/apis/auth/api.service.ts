import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Firebase } from './../../lib/firebase';
import { Auth } from './../../models/auth/auth';

@Injectable()
export class AuthApiService {

  auth$ = new BehaviorSubject<Auth>(Auth.blank());

  private firebase: any;
  private authStateCheckCanceller: any;
  private _auth: Auth;

  constructor(
    firebase: Firebase
  ) {
    this.firebase = firebase.instance;
  }

  signIn() {
    if (this.authStateCheckCanceller) {
      this.authStateCheckCanceller();
    }
    const provider = new this.firebase.auth.GoogleAuthProvider();
    this.authStateCheckCanceller = this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.auth = new Auth({
          authenticated: true,
          userName: user.displayName,
          photoURL: user.photoURL
        });
        return;
      }
      this.firebase.auth().signInWithRedirect(provider)
    });
    this.detectChangedAuthState();
  }

  signOut() {
    return this.firebase.auth().signOut();
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
