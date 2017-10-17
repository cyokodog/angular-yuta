import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DrillManagerContainerComponent } from './container.component';
import { DrillManagerCommandsService } from './commands.service';
import { DrillManagerQueriesService } from './queries.service';

@NgModule({
  declarations: [
    DrillManagerContainerComponent,
  ],
  providers: [
    DrillManagerCommandsService,
    DrillManagerQueriesService
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
  ]
})
export class DrillManagerModule { }
