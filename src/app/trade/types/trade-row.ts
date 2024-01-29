import { ISelect } from '../../shared/types/ISelect';

export interface ITradeRow {
  id: string;
  entryDate: string;
  exitDate: string;
  entryPrice: number;
  exitPrice: number;
  createdAt: string;
  ticker: ISelect;
  quantity: number;
}
