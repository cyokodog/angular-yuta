import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../../environments/firebase-config';
import * as firebase from 'firebase';


@Injectable()
export class Firebase {

  private firebase: any;

  constructor(
  ) {
    this.firebase = firebase;
    this.firebase.initializeApp(firebaseConfig);
  }

  get instance(): any {
    return this.firebase;
  }

}
