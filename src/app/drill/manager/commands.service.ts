import { Injectable } from '@angular/core'

import { DrillRepositoryService } from '../../shared/models/drill/repository.service'
import { Questions } from '../../shared/models/drill/questions';

@Injectable()
export class DrillManagerCommandsService {

  constructor(
    private drillRepo: DrillRepositoryService
  ){
  }

  fetchInitialData() {
    this.drillRepo.fetch();
  }

  save(questions: Questions) {
    this.drillRepo.save(questions);
  }

}
