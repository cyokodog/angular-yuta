import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import * as marked from 'marked';

import { DrillCommandsService } from './commands.service';
import { DrillQueriesService } from './queries.service';
import { Question } from '../shared/models/drill/question';

export enum TestState {
  stopped,
  running,
  paused
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
      this.questionHtml = this.toHtml(question.text);
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onStartButtonClicked() {
    this.pickupQuestion();
  }

  onAnswerButtonClicked() {
    this.scoring();
  }

  onNextButtonClicked() {
    this.pickupQuestion();
  }

  get isStopped(): boolean {
    return this.testState === TestState.stopped;
  }

  get startButtonDisabled(): boolean {
    return this.queries.isDataReady ? null : false;
  }

  get answerButtonDisabled(): boolean {
    return this.testState === TestState.running ? null : true;
  }

  get nextButtonDisabled(): boolean {
    return this.testState === TestState.paused ? null : true;
  }

  private toHtml(markdown): SafeHtml {
    return this.domSanitiser.bypassSecurityTrustHtml(marked(markdown));
  }

  private scoring() {
    this.commands.scoring();
    this.scorings = this.question.scorings.map(scoring => this.getScoreText(scoring));
    this.testState = TestState.paused;
  }

  private pickupQuestion() {
    this.commands.pickup();
    this.testState = TestState.running;
  }

  private getScoreText(scoring: boolean): string {
    return scoring === true ? '○' : scoring === false ? '☓' : '';
  }

}
