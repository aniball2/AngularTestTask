import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TradeStateService } from '../../services/trade-state.service';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrl: './chart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPageComponent {
  state = inject(TradeStateService);
}
