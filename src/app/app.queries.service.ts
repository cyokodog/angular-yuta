import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthRepositoryService } from './shared/models/auth/repository.service';
import { Auth } from './shared/models/auth/auth';

@Injectable()
export class AppQueriesService {

  constructor(
    private authRepositoryService: AuthRepositoryService
  ) {
  }

  get auth$(): Observable<Auth> {
    return this.authRepositoryService.auth$;
  }
}
