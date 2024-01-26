import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';

import { ITradeRow } from '../types/trade-row';
import { ITradeFilters } from '../types/trade-filters';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { ITradeFrom } from '../types/trade-form';

@Injectable({
  providedIn: 'root',
})
export class TradeStateService {
  filter$ = new BehaviorSubject<ITradeFilters>({
    entryDate: null,
    entryPrice: null,
    exitDate: null,
    exitPrice: null,
  });

  private _rows$ = new BehaviorSubject<ITradeRow[]>([]);
  rows$ = combineLatest([this._rows$.asObservable(), this.filter$]).pipe(
    map(([rows, filter]) => {
      return rows
        .filter(row => {
          if (filter.exitPrice !== null) {
            return row.exitPrice >= filter.exitPrice;
          }

          if (filter.entryPrice !== null) {
            return row.entryPrice >= filter.entryPrice;
          }

          if (filter.entryDate !== null) {
            return new Date(row.entryDate).getTime() >= filter.entryDate.getTime();
          }

          if (filter.exitDate !== null) {
            return new Date(row.exitDate).getTime() >= filter.exitDate.getTime();
          }

          return row;
        })
        .sort((prev, curr) => new Date(curr.createdAt).getTime() - new Date(prev.createdAt).getTime());
    }),
  );
  constructor() {
    // this.generate(5);
  }

  generate(count: number) {
    const row = () => ({
      id: faker.string.uuid(),
      entryDate: faker.date.past().toISOString(),
      exitDate: faker.date.future().toISOString(),
      createdAt: new Date().toISOString(),
      entryPrice:
        faker.number.float({
          min: 0,
          fractionDigits: 4,
        }) * 10,
      exitPrice:
        faker.number.float({
          min: 0,
          fractionDigits: 4,
        }) * 10,
    });
    this._rows$.next(
      faker.helpers.multiple(row, {
        count,
      }),
    );
    this.filter$.next(this.filter$.value);
  }

  updateFilters(filter: ITradeFilters) {
    this.filter$.next(filter);
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
