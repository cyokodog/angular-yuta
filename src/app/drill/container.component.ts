import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

interface Question {
  text: string;
  collects: string[];
  answers: string[];
  scorings: boolean[];
}

export enum TestState {
  running,
  stopped
}

@Component({
  selector:    'app-drill-container',
  templateUrl: './container.component.html',
  styleUrls:   ['./container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrillContainerComponent implements OnInit {

  testState: TestState = TestState.stopped;

  questions: Question[] = [
    {
      text: '1. 日本一高い山は？ 2. 日本の首都は？',
      collects: ['富士山', '東京'],
      answers: null,
      scorings: null,
    }
  ];

  quesition: Question;

  ngOnInit() {
  }

  get startButtonDisabled(): boolean {
    if (this.testState === TestState.running) {
      return true;
    }
    return null;
  }

  getScoreText(scoring: boolean): string {
    return scoring === true ? '○' : scoring === false ? '☓' : '';
  }

  answer() {
    this.quesition.collects.forEach((answer, i) => {
      this.quesition.scorings[i] = this.quesition.answers[i] === answer;
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  requestQuestion() {
    this.testState = TestState.running;
    this.quesition = this.questions[0];
    this.quesition.answers = new Array(this.quesition.collects.length);
    this.quesition.scorings = new Array(this.quesition.collects.length);
  }

}
