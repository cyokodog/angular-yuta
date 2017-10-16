import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { Question } from '../../models/drill/question';
import { Questions } from '../../models/drill/questions';

const SAMPLE = [
  {
    text: `
1. 日本一高い山は？
2. 日本の首都は？
    `,
    collects: ['富士山', '東京'],
    answers: null,
    scorings: null
  },
  {
    text: `1 + 2 =`,
    collects: ['3'],
    answers: null,
    scorings: null
  },
];

@Injectable()
export class DrillApiService {

  data: Questions;

  constructor() {
    this.data = new Questions(SAMPLE.map(question => {
      return new Question(question);
    }));
  }

  get(): Observable<Questions> {
    const questions$ = new AsyncSubject<Questions>();
    questions$.next(this.data);
    questions$.complete();
    return questions$;
  }

}
