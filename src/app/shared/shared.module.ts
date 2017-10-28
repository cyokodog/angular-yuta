import { NgModule } from '@angular/core';

import { AuthRepositoryService } from './models/auth/repository.service';
import { AuthApiService } from './apis/auth/api.service';
import { DrillApiService } from './apis/drill/api.service';
import { DrillRepositoryService } from './models/drill/repository.service';

@NgModule({
  providers: [
    AuthApiService,
    AuthRepositoryService,
    DrillApiService,
    DrillRepositoryService
  ]
})
export class SharedModule { }

