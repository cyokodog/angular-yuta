import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';
import { Question } from '../../models/drill/question';
import { Questions } from '../../models/drill/questions';

@Injectable()
export class DrillApiService {

  constructor(
    private afDb: AngularFireDatabase
  ) {
  }

  get(): Observable<Questions> {
    return this.questions$.map(questions => this.adaptToQuestions(questions));
  }

  save(questions: Questions) {
    this.questionsKeys$.take(1).subscribe(keys => {
      keys.forEach(key => this.questionsRef.remove(key));
      const questionRef = this.adaptToQuestionsRef(questions);
      Object.keys(questionRef).forEach(i => {
        this.questionsRef.update(i, questionRef[i]);
      });
    });
  }

  private get questionsRef() {
    return this.afDb.list<object>('questions');
  }

  private get questions$(): Observable<object> {
    return this.questionsRef.valueChanges();
  }

  private get questionsKeys$(): Observable<string[]> {
    return this.questions$.map(questions => Object.keys(questions));
  }

  private adaptToQuestionsRef(questions) {
    const questionsRef = {};
    questions.toArray().forEach((item, index) => {
      questionsRef[index] = {
        text: item.text,
        collects: item.collects
      };
    });
    return questionsRef;
  }

  private adaptToQuestions(res) {
    const buf = [];
    for (const key of Object.keys(res)) {
      buf.push(new Question({
        key: key,
        text: res[key].text,
        collects: res[key].collects
      }));
    }
    return new Questions(buf);
  }
}
