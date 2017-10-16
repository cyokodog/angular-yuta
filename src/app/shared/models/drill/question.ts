interface AdaptedQuestion {
  text: string;
  collects: string[];
  answers: string[];
  scorings: boolean[];
}

export class Question {

  answers: string[];
  scorings: boolean[];

  static blank(): Question {
    return new Question({
      text: '',
      collects: [],
      answers: [],
      scorings: []
    });
  }

  constructor(
    private item: AdaptedQuestion,
  ) {
    if (item.collects && item.collects.length) {
      this.answers = new Array(item.collects.length);
      this.scorings = new Array(item.collects.length);
    }
  }

  get text(): string {
    return this.item.text;
  }

  get collects(): string[] {
    return this.item.collects;
  }

}
