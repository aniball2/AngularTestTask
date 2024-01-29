import { ITradeRow } from '../types/trade-row';

export function amountOfProfit(data: ITradeRow) {
  return data.exitPrice * data.quantity - data.entryPrice * data.quantity;
}
