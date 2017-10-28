import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
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
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    SharedModule,
    DrillManagerModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ]
})
export class DrillModule { }
