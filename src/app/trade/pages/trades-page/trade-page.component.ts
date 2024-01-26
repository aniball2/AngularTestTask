import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TradeStateService } from '../../services/trade-state.service';
import { ITradeRow } from '../../types/trade-row';

@Component({
  selector: 'app-trade-page',
  templateUrl: './trade-page.component.html',
  styleUrl: './trade-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradePageComponent {
  state = inject(TradeStateService);
  isOpenForm = false;
  editRow: ITradeRow | null = null;

  openForm(row?: ITradeRow) {
    this.isOpenForm = true;

    if (row) {
      this.editRow = row;
    }
  }

  closeForm() {
    this.isOpenForm = false;
    this.editRow = null;
  }
}
