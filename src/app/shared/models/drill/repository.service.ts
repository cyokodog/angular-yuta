import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DrillApiService } from '../../apis/drill/api.service'
import { Question } from './question';
import { Questions } from './questions';

@Injectable()
export class DrillRepositoryService {

  entities$   = new BehaviorSubject<Questions>(Questions.blank());
  question$   = new BehaviorSubject<Question>(Question.blank());

  private _entities: Questions;
  private _question: Question;

  constructor(
    private api: DrillApiService
  ) {
  }

  fetch() {
    this.api
      .get()
      .subscribe(data => this.entities = data);
  }

  pickup() {
    this.question = this.entities.pickup();
  }

  scoring() {
    if (!this.question) return;
    this.question.collects.forEach((answer, i) => {
      this.question.scorings[i] = this.question.answers[i] === answer;
    });
  }

  private get entities(): Questions {
    return this._entities;
  }

  private set entities(v: Questions) {
    this._entities = v;
    this.entities$.next(this._entities);
  }

  private get question(): Question {
    return this._question;
  }

  private set question(v: Question) {
    this._question = v;
    this.question$.next(this._question);
  }

}
