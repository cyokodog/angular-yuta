import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { Subscription } from 'rxjs/Subscription';
import * as marked from 'marked';

import { DrillCommandsService } from './commands.service';
import { DrillQueriesService } from './queries.service';
import { Question } from '../shared/models/drill/question';

enum TestState {
  stopped,
  running,
  paused,
  finished
}

@Component({
  selector:    'app-drill-container',
  templateUrl: './container.component.html',
  styleUrls:   ['./container.component.css'],
})
export class DrillContainerComponent implements OnInit, OnDestroy {

  protected subscriptions = [] as Subscription[];

  testState: TestState = TestState.stopped;
  question: Question;
  answers: Question[] = [];
  questionHtml: SafeHtml;
  scorings: string[] = [];

  constructor(
    private commands: DrillCommandsService,
    private queries: DrillQueriesService,
    private domSanitiser: DomSanitizer,
  ) {
  }

  ngOnInit() {
    this.commands.fetchInitialData();
    this.subscriptions.push(
      this.queries.question$.subscribe(question => {
        this.question = question;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  toHtml(markdown): SafeHtml {
    return this.domSanitiser.bypassSecurityTrustHtml(marked(markdown));
  }

  getScoreText(scoring: boolean): string {
    return scoring === true ? '○ 正解' : scoring === false ? '☓ 不正解' : '';
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

  get startButtonDisabledClass(): boolean{
    return this.startButtonDisabled !== null;
  }

  get answerButtonDisabledClass(): boolean{
    return this.answerButtonDisabled !== null;
  }

  get nextButtonDisabledClass(): boolean{
    return this.nextButtonDisabled !== null;
  }

  get finishButtonDisabledClass(): boolean{
    return this.finishButtonDisabled !== null;
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
    this.answers = [];
    this.testState = TestState.running;
  }

  private pickup() {
    this.commands.pickup();
    this.testState = TestState.running;
  }

}
