import { Firebase } from './../shared/lib/firebase';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DrillContainerComponent } from './container.component';
import { DrillCommandsService } from './commands.service';
import { DrillQueriesService } from './queries.service';
import { DrillManagerModule } from './manager/module';

@NgModule({
  declarations: [
    DrillContainerComponent,
  ],
  providers: [
    DrillCommandsService,
    DrillQueriesService,
    Firebase
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    SharedModule,
    DrillManagerModule
  ]
})
export class DrillModule { }
