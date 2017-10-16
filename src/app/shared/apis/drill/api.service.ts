import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { WindowRef } from '../../lib/window-ref';
import { Question } from '../../models/drill/question';
import { Questions } from '../../models/drill/questions';

@Injectable()
export class DrillApiService {

  private firebase: any;
  private data: Questions;
  private questionsReady: Promise<Questions>;

  constructor(
    private windowRef: WindowRef
  ) {
    this.firebase = windowRef.nativeWindow['firebase'];
    this.questionsReady = this.prepareQuestionsAsPromise().then(data => this.data = data);
  }

  get(): Observable<Questions> {
    const questions$ = new AsyncSubject<Questions>();
    this.questionsReady.then(() => {
      questions$.next(this.data);
      questions$.complete();
    });
    return questions$;
  }

  private prepareQuestionsAsPromise(): Promise<Questions> {
    return new Promise(resolve => {
      const db = this.firebase.database();
      const messageRef = db.ref('/questions');
      messageRef.on('value', snapshot => {
        const dbQuestions = snapshot.val();
        const questions = [];
        for(let key in dbQuestions) {
          questions.push(new Question(dbQuestions[key]));
        }
        resolve(new Questions(questions));
      });
    });
  }

}
