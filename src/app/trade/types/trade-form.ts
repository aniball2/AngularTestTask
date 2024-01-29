export interface ITradeFrom {
  entryDate: Date;
  exitDate: Date;
  entryPrice: number;
  exitPrice: number;
  id: string | null;
  ticker: string;
  quantity: number;
}
