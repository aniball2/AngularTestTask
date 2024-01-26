import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ITradeRow } from '../../types/trade-row';

@Component({
  selector: 'app-trade-table',
  templateUrl: './trade-table.component.html',
  styleUrl: './trade-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeTableComponent {
  @Input() rows: ITradeRow[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<ITradeRow>();

  trackByFn(_: number, data: ITradeRow): string {
    return data.createdAt;
  }
}
