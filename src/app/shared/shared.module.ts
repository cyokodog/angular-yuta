import { NgModule } from '@angular/core';

import { WindowRef } from './lib/window-ref'
import { DrillApiService } from './apis/drill/api.service';
import { DrillRepositoryService } from './models/drill/repository.service';

@NgModule({
  providers: [
    WindowRef,
    DrillApiService,
    DrillRepositoryService
  ]
})
export class SharedModule { }

