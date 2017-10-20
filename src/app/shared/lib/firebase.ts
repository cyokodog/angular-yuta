import { Injectable } from '@angular/core';
import { WindowRef } from './window-ref';
import { firebaseConfig } from '../../../environments/firebase-config';

@Injectable()
export class Firebase {

  firebase: any;
  user: any;

  constructor(
    private windowRef: WindowRef
  ) {
    this.firebase = this.windowRef.nativeWindow['firebase'];
    this.firebase.initializeApp(firebaseConfig);
  }

  get instance(): any {
    return this.firebase;
  }

  auth() {
    // const provider = new this.firebase.auth.GoogleAuthProvider();
    // this.firebase.auth().onAuthStateChanged(user => {
    //   if (!user) {
    //     this.firebase.auth().signInWithRedirect(provider)
    //   } else {
    //     this.user = user;
    //   }
    // })
    // this.firebase.auth().getRedirectResult().then(result => {
    //   if (!result.user) {
    //     this.firebase.auth().signInWithRedirect(provider)
    //   } else {
    //     this.user = result.user;
    //   }
    // });
  }

}
