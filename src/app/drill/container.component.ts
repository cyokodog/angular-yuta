import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector:    'app-drill-container',
  templateUrl: './container.component.html',
  styleUrls:   ['./container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrillContainerComponent {
}
