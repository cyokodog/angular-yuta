import { Question } from './question';

export class Questions {

  foo: string = 'FOO';

  static blank(): Questions {
    return new Questions([] as Question[]);
  }

  constructor(
    protected list: Question[]
  ) {
  }

  toArray(): Question[] {
    return this.list;
  }

  pickup(): Question {
    return this.list[this.getRandomQuestionIndex()];
  }

  private getRandomQuestionIndex() {
    const min = 0;
    const max = this.list.length - 1;
    return Math.floor( Math.random() * (max + 1 - min) ) + min;
  }



}
