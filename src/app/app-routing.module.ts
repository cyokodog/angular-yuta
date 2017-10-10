import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrillContainerComponent } from './drill/container.component';

export const routes: Routes = [
  {
    path:      'drill',
    component: DrillContainerComponent,
  }
];

@NgModule({
  imports:   [RouterModule.forRoot(routes)],
  exports:   [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
