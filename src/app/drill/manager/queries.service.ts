import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';

import { DrillRepositoryService } from '../../shared/models/drill/repository.service'
import { Questions } from '../../shared/models/drill/questions';

@Injectable()
export class DrillManagerQueriesService {

  constructor(
    private drillRepo: DrillRepositoryService
  ) {
  }

  get questions$(): Observable<Questions> {
    return this.drillRepo.questions$;
  }

}
