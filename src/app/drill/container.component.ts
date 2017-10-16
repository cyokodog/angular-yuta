import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import * as marked from 'marked';

import { DrillCommandsService } from './commands.service';
import { DrillQueriesService } from './queries.service';
import { Question } from '../shared/models/drill/question';

export enum TestState {
  stopped,
  running,
  paused,
  finished
}

@Component({
  selector:    'app-drill-container',
  templateUrl: './container.component.html',
  styleUrls:   ['./container.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrillContainerComponent implements OnInit {

  testState: TestState = TestState.stopped;

  question: Question;
  answers: Question[] = [];
  questionHtml: SafeHtml;
  scorings: string[] = [];

  constructor(
    private commands: DrillCommandsService,
    private queries: DrillQueriesService,
    private domSanitiser: DomSanitizer,
  ){
  }

  ngOnInit() {
    this.commands.fetchInitialData();
    this.queries.question$.subscribe(question => {
      this.question = question;
    });
  }

  toHtml(markdown): SafeHtml {
    return this.domSanitiser.bypassSecurityTrustHtml(marked(markdown));
  }

  getScoreText(scoring: boolean): string {
    return scoring === true ? '○' : scoring === false ? '☓' : '';
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onStartButtonClicked() {
    this.start();
  }

  onAnswerButtonClicked() {
    this.scoring();
  }

  onNextButtonClicked() {
    this.pickup();
  }

  onFinishButtonClicked() {
    this.finish();
  }

  get isStopped(): boolean {
    return this.testState === TestState.stopped;
  }

  get isRunning(): boolean {
    return this.testState === TestState.running;
  }

  get isPaused(): boolean {
    return this.testState === TestState.paused;
  }

  get isFinished(): boolean {
    return this.testState === TestState.finished;
  }

  get startButtonDisabled(): boolean {
    return this.queries.isReady ? null : false;
  }

  get answerButtonDisabled(): boolean {
    return this.testState === TestState.running ? null : true;
  }

  get nextButtonDisabled(): boolean {
    return !this.queries.isFinished && this.testState === TestState.paused ? null : true;
  }

  get finishButtonDisabled(): boolean {
    return this.queries.canFinishing ? null : true;
  }

  private finish() {
    this.testState = TestState.finished;
  }

  private scoring() {
    this.commands.scoring();
    this.answers.push(this.question);
    this.testState = TestState.paused;
  }

  private start() {
    this.commands.start();
    this.testState = TestState.running;
  }

  private pickup() {
    this.commands.pickup();
    this.testState = TestState.running;
  }

}
