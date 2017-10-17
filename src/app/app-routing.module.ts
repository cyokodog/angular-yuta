import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrillContainerComponent } from './drill/container.component';
import { DrillManagerContainerComponent } from './drill/manager/container.component';

export const routes: Routes = [
  {
    path:      'drill',
    component: DrillContainerComponent,
  },
  {
    path:      'drill/manager',
    component: DrillManagerContainerComponent,
  }
];

@NgModule({
  imports:   [RouterModule.forRoot(routes)],
  exports:   [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
