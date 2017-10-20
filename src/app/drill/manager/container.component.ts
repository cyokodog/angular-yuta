import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { Subscription } from 'rxjs/Subscription';

import { DrillManagerCommandsService } from './commands.service';
import { DrillManagerQueriesService } from './queries.service';
import { Questions } from '../../shared/models/drill/questions';
import { Question } from '../../shared/models/drill/question';

enum Mode {
  noEdit,
  add,
  update,
  delete,
}

@Component({
  selector:    'app-drill-manager-container',
  templateUrl: './container.component.html',
  styleUrls:   ['./container.component.css'],
})
export class DrillManagerContainerComponent implements OnInit, OnDestroy {

  protected subscriptions = [] as Subscription[];

  mode: Mode = Mode.noEdit;
  question: Question = Question.blank();
  questions: Question[];
  updatingIndex: number;

  constructor(
    private commands: DrillManagerCommandsService,
    private queries: DrillManagerQueriesService,
    private domSanitiser: DomSanitizer,
  ) {
  }

  ngOnInit() {
    this.commands.fetchInitialData();
    this.subscriptions.push(
      this.queries.questions$.subscribe(questions => {
        this.questions = questions.toArray();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onCollectAdditionButtonClicked() {
    this.question.collects.push('');
  }

  onCollectDeleteButtonClicked(index: number) {
    this.question.collects.splice(index, 1);
  }

  onQuestionSaveButtonClicked() {
    this.save(this.mode);
    this.mode = Mode.noEdit;
  }

  onCancelButtonClicked() {
    this.mode = Mode.noEdit;
  }

  onQuestionDeleteButtonClicked() {
    this.save(Mode.delete);
    this.mode = Mode.noEdit;
  }

  onQuestionAdditionButtonClicked() {
    this.mode = Mode.add;
    this.question = Question.blank();
    this.question.collects = [''];
  }

  onQuestionUpdatingButtonClicked(index: number) {
    this.updatingIndex = index;
    this.question = this.questions[index];
    this.mode = Mode.update;
  }

  get isNoEdit(): boolean {
    return this.mode === Mode.noEdit;
  }

  get isAdding(): boolean {
    return this.mode === Mode.add;
  }

  get isUpdating(): boolean {
    return this.mode === Mode.update;
  }

  private save(mode: Mode) {
    if (mode === Mode.delete) {
      this.questions.splice(this.updatingIndex, 1);
    } else if (mode === Mode.update) {
      const question = this.questions[this.updatingIndex];
      question.text = this.question.text;
      question.collects = this.question.collects;
      this.trimEmptyCollect(question);
    } else {
      this.trimEmptyCollect(this.question);
      this.questions.push(this.question);
    }
    this.commands.save(new Questions(this.questions));
  }

  private trimEmptyCollect(question: Question) {
    question.collects.forEach((collect, index) => {
      if (!collect) {
        question.collects.splice(index, 1);
      }
    });
  }
}
