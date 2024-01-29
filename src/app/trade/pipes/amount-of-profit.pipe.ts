import { Pipe, PipeTransform } from '@angular/core';
import { amountOfProfit } from '../helpers/amount-of-profit';
import { ITradeRow } from '../types/trade-row';

@Pipe({
  name: 'amountOfProfit',
})
export class AmountOfProfitPipe implements PipeTransform {
  transform(_: unknown, data: ITradeRow): unknown {
    return amountOfProfit(data);
  }
}
