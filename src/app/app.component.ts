import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppCommandsService } from './app.commands.service';
import { AppQueriesService } from './app.queries.service';
import { Auth } from './shared/models/auth/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  constructor(
    private commands: AppCommandsService,
    private queries: AppQueriesService,
  ) {
    this.commands.signIn();
  }

  onSignOutButtonClicked() {
    this.commands.signOut().then(_ => location.reload());
  }

  get auth$(): Observable<Auth> {
    return this.queries.auth$;
  }

}
