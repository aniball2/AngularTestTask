import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';

import { ITradeRow } from '../types/trade-row';
import { BehaviorSubject, map } from 'rxjs';
import { ITradeFrom } from '../types/trade-form';

@Injectable({
  providedIn: 'root',
})
export class TradeStateService {
  initialBalance: ITradeRow = {
    id: '',
    entryDate: '',
    exitDate: '',
    entryPrice: 0,
    exitPrice: 0,
    createdAt: '',
    ticker: { label: '', value: null },
    quantity: 0,
  };

  private _rows$ = new BehaviorSubject<ITradeRow[]>([]);
  rows$ = this._rows$.asObservable().pipe(
    map(rows => {
      return rows.sort((prev, curr) => new Date(curr.createdAt).getTime() - new Date(prev.createdAt).getTime());
    }),
  );
  chartData$ = this._rows$.asObservable().pipe(
    map(rows => {
      const sorted = rows.sort((prev, curr) => new Date(prev.exitDate).getTime() - new Date(curr.exitDate).getTime());
      return [this.initialBalance, ...sorted];
    }),
  );
  constructor() {
    // this.generate(15);
  }

  generate(count: number) {
    const row = () => ({
      id: faker.string.uuid(),
      entryDate: faker.date.past().toISOString(),
      exitDate: faker.date.future().toISOString(),
      createdAt: new Date().toISOString(),
      quantity: faker.number.int(),
      entryPrice:
        faker.number.float({
          min: 0,
          fractionDigits: 3,
        }) * 10,
      exitPrice:
        faker.number.float({
          min: 0,
          fractionDigits: 3,
        }) * 10,
      ticker: {
        label: faker.company.name(),
        value: faker.company.name(),
      },
    });
    this._rows$.next(
      faker.helpers.multiple(row, {
        count,
      }),
    );
  }

  delete(id: string) {
    this._rows$.next(this._rows$.value.filter(item => item.id !== id));
  }

  create(value: ITradeFrom) {
    const rows: ITradeRow[] = [
      ...this._rows$.value,
      {
        createdAt: new Date().toISOString(),
        exitPrice: value.exitPrice,
        exitDate: value.exitDate.toISOString(),
        entryDate: value.entryDate.toISOString(),
        entryPrice: value.entryPrice,
        id: faker.string.uuid(),
        ticker: value.ticker,
        quantity: value.quantity,
      },
    ];
    this._rows$.next(rows);
  }

  edit(value: ITradeFrom) {
    const rows = this._rows$.value.map(item => {
      if (item.id === value.id) {
        return {
          exitPrice: value.exitPrice,
          exitDate: value.exitDate.toISOString(),
          entryDate: value.entryDate.toISOString(),
          entryPrice: value.entryPrice,
          id: item.id,
          createdAt: item.createdAt,
          quantity: item.quantity,
          ticker: item.ticker,
        };
      }

      return item;
    });

    this._rows$.next(rows);
  }

  upsert(value: ITradeFrom) {
    if (value.id) {
      this.edit(value);
    } else {
      this.create(value);
    }
  }
}
