import { Injectable } from '@angular/core';
import { WindowRef } from './window-ref';

@Injectable()
export class Firebase {

  constructor(
    private windowRef: WindowRef
  ) {
  }

  get instance(): any {
    return this.windowRef.nativeWindow['firebase'];
  }

}
