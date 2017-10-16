import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DrillApiService } from '../../apis/drill/api.service'
import { Question } from './question';
import { Questions } from './questions';

@Injectable()
export class DrillRepositoryService {

  questions$   = new BehaviorSubject<Questions>(Questions.blank());
  question$   = new BehaviorSubject<Question>(Question.blank());

  private _questions: Questions;
  private _question: Question;

  private neededFinishingCount = 2;
  private pickupedCache = {};
  private clearCount = 0;

  constructor(
    private api: DrillApiService
  ) {
  }

  fetch() {
    this.api
      .get()
      .subscribe(data => this.questions = data);
  }

  start() {
    this.initPickupedInfo();
    this.pickup();
  }

  pickup() {
    this.question = this.questions.toArray()[this.getRandomQuestionIndex()];
  }

  scoring() {
    if (!this.question) return;
    this.question.collects.forEach((answer, i) => {
      this.question.scorings[i] = this.question.answers[i] === answer;
    });
    this.clearCount ++;
  }

  get isReady(): boolean {
    return !!this.questions;
  }

  get isFinished(): boolean {
    return this.clearCount >= this.questionCount;
  }

  get canFinishing(): boolean {
    return this.clearCount >= this.neededFinishingCount;
  }

  get questionCount(): number{
    return this.questions.toArray().length;
  }

  private initPickupedInfo() {
    this.clearCount = 0;
    this.pickupedCacheKeys.forEach(key => {
      this.questions.toArray()[key].initialieze();
    });
    this.pickupedCache = [];
  }

  private get pickupedCacheKeys() {
    return Object.keys(this.pickupedCache);
  }

  private getRandomQuestionIndex() {
    const min = 0;
    const max = this.questionCount - 1;
    const index = Math.floor( Math.random() * (max + 1 - min) ) + min;

    if (!this.pickupedCache[index]) {
      this.pickupedCache[index] = true;
      return index;
    }
    if (this.isFinished) {
      this.initPickupedInfo();
    }
    return this.getRandomQuestionIndex();
  }

  private get questions(): Questions {
    return this._questions;
  }

  private set questions(v: Questions) {
    this._questions = v;
    this.questions$.next(this._questions);
  }

  private get question(): Question {
    return this._question;
  }

  private set question(v: Question) {
    this._question = v;
    this.question$.next(this._question);
  }

}
