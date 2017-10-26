import { Injectable } from '@angular/core';
import { WindowRef } from './window-ref';
import { firebaseConfig } from '../../../environments/firebase-config';

@Injectable()
export class Firebase {

  private firebase: any;

  constructor(
    private windowRef: WindowRef
  ) {
    this.firebase = this.windowRef.nativeWindow['firebase'];
    this.firebase.initializeApp(firebaseConfig);
  }

  get instance(): any {
    return this.firebase;
  }

}
