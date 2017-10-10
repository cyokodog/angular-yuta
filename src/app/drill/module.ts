import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DrillContainerComponent } from './container.component';

@NgModule({
  declarations: [
    DrillContainerComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
  ]
})
export class DrillModule { }