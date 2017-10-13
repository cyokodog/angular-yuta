import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

interface Question {
  text: string;
  html: SafeHtml;
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
      text: '<ul><li>日本一高い山は？</li><li>日本の首都は？</li></ul>',
      html: null,
      collects: ['富士山', '東京'],
      answers: null,
      scorings: null,
    }
  ];

  quesition: Question;

  constructor(private domSanitiser: DomSanitizer){
  }

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
    this.quesition.html = this.domSanitiser.bypassSecurityTrustHtml(this.quesition.text);
    this.quesition.answers = new Array(this.quesition.collects.length);
    this.quesition.scorings = new Array(this.quesition.collects.length);
  }

}
