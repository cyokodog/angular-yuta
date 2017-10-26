import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthApiService } from './../../apis/auth/api.service';
import { Auth } from './auth';

@Injectable()
export class AuthRepositoryService {

  constructor(
    private authApiService: AuthApiService
  ) {
  }

  get auth$(): Observable<Auth> {
    return this.authApiService.auth$;
  }

  signIn() {
    this.authApiService.signIn();
  }

  signOut() {
    return this.authApiService.signOut();
  }

}
