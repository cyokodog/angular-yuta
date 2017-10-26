import { Injectable } from '@angular/core';
import { AuthRepositoryService } from './shared/models/auth/repository.service';

@Injectable()
export class AppCommandsService {

  constructor(
    private authRepositoryService: AuthRepositoryService
  ) {
  }

  signIn() {
    this.authRepositoryService.signIn();
  }

  signOut() {
    return this.authRepositoryService.signOut();
  }
}
