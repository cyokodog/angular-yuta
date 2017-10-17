import { NgModule } from '@angular/core';

import { WindowRef } from './lib/window-ref'
import { Firebase } from './lib/firebase'
import { DrillApiService } from './apis/drill/api.service';
import { DrillRepositoryService } from './models/drill/repository.service';

@NgModule({
  providers: [
    WindowRef,
    Firebase,
    DrillApiService,
    DrillRepositoryService
  ]
})
export class SharedModule { }

