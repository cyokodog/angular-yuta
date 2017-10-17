interface AdaptedQuestion {
  key: string;
  text: string;
  collects: string[];
}

export class Question {

  answers: string[];
  scorings: boolean[];

  static blank(): Question {
    return new Question({
      key: '',
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

  set text(v: string) {
    this.item.text = v;
  }

  get text(): string {
    return this.item.text;
  }

  set collects(v: string[]) {
    this.item.collects = v;
  }

  get collects(): string[] {
    return this.item.collects;
  }

  get key(): string {
    return this.item.key;
  }

}
