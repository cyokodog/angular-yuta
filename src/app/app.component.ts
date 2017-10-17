import { Component } from '@angular/core';

import { Firebase } from './shared/lib/firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private firebase: Firebase
  ){
    firebase.auth();
  }

  get user(): any {
    return this.firebase.user;
  }
}
