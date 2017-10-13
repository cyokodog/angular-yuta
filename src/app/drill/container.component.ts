import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import * as marked from 'marked';

interface Question {
  text: string;
  html: SafeHtml;
  collects: string[];
  answers: string[];
  scorings: boolean[];
}

export enum TestState {
  stopped,
  running,
  paused
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
      text: `
1. 日本一高い山は？
2. 日本の首都は？
      `,
      html: null,
      collects: ['富士山', '東京'],
      answers: null,
      scorings: null,
    },
    {
      text: `1 + 2 =`,
      html: null,
      collects: ['3'],
      answers: null,
      scorings: null,
    },
  ];

  quesition: Question;

  constructor(private domSanitiser: DomSanitizer){
  }

  ngOnInit() {
  }

  getScoreText(scoring: boolean): string {
    return scoring === true ? '○' : scoring === false ? '☓' : '';
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onStartButtonClicked() {
    this.requestQuestion();
  }

  onAnswerButtonClicked() {
    this.answer();
  }

  onNextButtonClicked() {
    this.requestQuestion();
  }

  get isStopped(): boolean {
    return this.testState === TestState.stopped;
  }

  get answerButtonDisabled(): boolean {
    if (this.testState === TestState.running) {
      return null;
    }
    return true;
  }

  get nextButtonDisabled(): boolean {
    if (this.testState === TestState.paused) {
      return null;
    }
    return true;
  }

  private answer() {
    this.quesition.collects.forEach((answer, i) => {
      this.quesition.scorings[i] = this.quesition.answers[i] === answer;
    });
    this.testState = TestState.paused;
  }

  private requestQuestion() {
    const index = this.getRandomNumber(0, this.questions.length - 1);
    this.testState = TestState.running;
    this.quesition = this.questions[index];
    this.quesition.html = this.domSanitiser.bypassSecurityTrustHtml(marked(this.quesition.text));
    this.quesition.answers = new Array(this.quesition.collects.length);
    this.quesition.scorings = new Array(this.quesition.collects.length);
  }

  private getRandomNumber(min: number, max: number) {
    return Math.floor( Math.random() * (max + 1 - min) ) + min;
  }

}
