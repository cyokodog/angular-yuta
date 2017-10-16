import { NgModule } from '@angular/core';

import { DrillApiService } from './apis/drill/api.service';
import { DrillRepositoryService } from './models/drill/repository.service';

@NgModule({
  providers: [
    DrillApiService,
    DrillRepositoryService
  ]
})
export class SharedModule { }

