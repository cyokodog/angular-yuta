import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { Firebase } from '../../lib/firebase';
import { Question } from '../../models/drill/question';
import { Questions } from '../../models/drill/questions';

@Injectable()
export class DrillApiService {

  private firebase: any;
  private db;
  private questionsRef;
  private data: Questions;
  private questionsReady: Promise<Questions>;

  private queue = [];

  constructor(
    private _firebase: Firebase
  ) {
    this.firebase = _firebase.instance;
    this.db = this.firebase.database();
    this.questionsRef = this.db.ref('/questions');
    this.questionsReady = this.prepareQuestions().then(data => this.data = data);
  }

  get(): Observable<Questions> {
    const questions$ = new AsyncSubject<Questions>();
    this.questionsReady.then(() => {
      questions$.next(this.data);
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
  }

  private prepareQuestions(): Promise<Questions> {
    return new Promise(resolve => {
      this.questionsRef.on('value', snapshot => {
        const dbQuestions = snapshot.val();
        const questionsBuf = [];
        for(let key in dbQuestions) {
          questionsBuf.push(new Question({
            key: key,
            text: dbQuestions[key].text,
            collects: dbQuestions[key].collects
          }));
        }
        resolve(new Questions(questionsBuf));
      });
    });
  }

}
