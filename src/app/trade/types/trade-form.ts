import { ISelect } from '../../shared/types/ISelect';

export interface ITradeFrom {
  entryDate: Date;
  exitDate: Date;
  entryPrice: number;
  exitPrice: number;
  id: string | null;
  ticker: ISelect;
  quantity: number;
}
