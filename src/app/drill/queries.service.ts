import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';

import { DrillRepositoryService } from '../shared/models/drill/repository.service'
import { Questions } from '../shared/models/drill/questions';
import { Question } from '../shared/models/drill/question';

@Injectable()
export class DrillQueriesService {

  constructor(
    private drillRepo: DrillRepositoryService
  ){
  }

  get questions$(): Observable<Questions> {
    return this.drillRepo.questions$;
  }

  get question$(): Observable<Question> {
    return this.drillRepo.question$;
  }

  get isReady(): boolean {
    return this.drillRepo.isReady;
  }

  get isFinished(): boolean {
    return this.drillRepo.isFinished;
  }

  get canFinishing(): boolean {
    return this.drillRepo.canFinishing;
  }

}
