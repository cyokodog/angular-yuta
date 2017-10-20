import { Injectable } from '@angular/core'

import { DrillRepositoryService } from '../shared/models/drill/repository.service'

@Injectable()
export class DrillCommandsService {

  constructor(
    private drillRepo: DrillRepositoryService
  ) {
  }

  fetchInitialData() {
    this.drillRepo.fetch();
  }

  start() {
    this.drillRepo.start();
  }

  pickup() {
    this.drillRepo.pickup();
  }

  scoring() {
    this.drillRepo.scoring();
  }

}
