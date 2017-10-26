import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCommandsService } from './app.commands.service';
import { AppQueriesService } from './app.queries.service';
import { DrillModule } from './drill/module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DrillModule
  ],
  providers: [
    AppQueriesService,
    AppCommandsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
