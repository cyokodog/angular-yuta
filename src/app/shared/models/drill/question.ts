interface AdaptedQuestion {
  text: string;
  collects: string[];
}

export class Question {

  answers: string[];
  scorings: boolean[];

  static blank(): Question {
    return new Question({
      text: '',
      collects: [],
    });
  }

  constructor(
    private item: AdaptedQuestion,
  ) {
    this.initialieze();
  }

  initialieze() {
    if (this.item.collects && this.item.collects.length) {
      this.answers = new Array(this.item.collects.length);
      this.scorings = new Array(this.item.collects.length);
    }
  }

  get text(): string {
    return this.item.text;
  }

  get collects(): string[] {
    return this.item.collects;
  }

}
