import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { Firebase } from '../../lib/firebase';
import { Question } from '../../models/drill/question';
import { Questions } from '../../models/drill/questions';

@Injectable()
export class DrillApiService {

  private db;
  private questionsRef;
  private questions: Questions;
  private questionsReady: Promise<Questions>;

  private queue = [];

  constructor(
    private firebase: Firebase
  ) {
    this.db = firebase.instance.database();
    this.questionsRef = this.db.ref('/questions');
    this.questionsReady = this.prepareQuestions();
  }

  get(): Observable<Questions> {
    const questions$ = new AsyncSubject<Questions>();
    this.questionsReady.then(() => {
      questions$.next(this.questions);
      questions$.complete();
    });
    return questions$;
  }

  save(questions: Questions) {
    const params = {};
    questions.toArray().forEach((item, index) => {
      params[index] = {
        text: item.text,
        collects: item.collects
      };
    });
    this.questionsRef.set(params);
    this.questionsReady = this.prepareQuestions();
  }

  private prepareQuestions(): Promise<Questions> {
    return new Promise(resolve => {
      this.questionsRef.once('value', snapshot => {
        const questions = snapshot.val();
        const buf = [];
        for (const key of Object.keys(questions)) {
          buf.push(new Question({
            key: key,
            text: questions[key].text,
            collects: questions[key].collects
          }));
        }
        this.questions = new Questions(buf);
        resolve();
      });
    });
  }

}
