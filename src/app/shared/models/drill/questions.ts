import { Question } from './question';

export class Questions {

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

}
