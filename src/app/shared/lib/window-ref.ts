import { Injectable } from '@angular/core';

@Injectable()
export class WindowRef {

  constructor() { }

  /**
   * @readonly
   */
  get nativeWindow(): Window {
    return window;
  }

}
