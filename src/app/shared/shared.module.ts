import { NgModule } from '@angular/core';

import { WindowRef } from './lib/window-ref'
import { Firebase } from './lib/firebase'
import { AuthRepositoryService } from './models/auth/repository.service';
import { AuthApiService } from './apis/auth/api.service';
import { DrillApiService } from './apis/drill/api.service';
import { DrillRepositoryService } from './models/drill/repository.service';

@NgModule({
  providers: [
    WindowRef,
    Firebase,
    AuthApiService,
    AuthRepositoryService,
    DrillApiService,
    DrillRepositoryService
  ]
})
export class SharedModule { }

