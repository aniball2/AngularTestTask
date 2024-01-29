import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import startOfDay from 'date-fns/startOfDay';
import isToday from 'date-fns/isToday';
import isSameDay from 'date-fns/isSameDay';

import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';

import { ITradeFrom } from '../../types/trade-form';
import { ITradeRow } from '../../types/trade-row';
import { CustomValidators } from '../../../shared/services/custom-validators';
import { updateValueAndValidity } from '../../../shared/helpers/update-value-and-validity';
import { range } from '../../../shared/helpers/range';
import { Errors } from '../../../shared/constants/errors';

@Component({
  selector: 'app-trade-form',
  templateUrl: './trade-form.component.html',
  styleUrl: './trade-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeFormComponent implements OnInit {
  @Input() data: ITradeRow | null = null;
  @Output() submit = new EventEmitter<ITradeFrom>();
  @Output() cancel = new EventEmitter<void>();
  title = '';
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group(
    {
      id: this.fb.control<string | null>(null),
      entryDate: this.fb.control<Date | null>(null, [Validators.required]),
      exitDate: this.fb.control<Date | null>(null, [Validators.required]),
      entryPrice: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
      exitPrice: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
      quantity: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
      ticker: this.fb.nonNullable.control<string>('', [Validators.required]),
    },
    {
      validators: [CustomValidators.dateLessThan('entryDate', 'exitDate')],
    },
  );
  startOfDay = startOfDay(Date.now()).getTime();
  entryDateDisabledDate: (current: Date) => boolean = date => date.getTime() < this.startOfDay;
  exitDateDisabledDate: (current: Date) => boolean = date =>
    this.form.controls.entryDate.value
      ? date.getTime() < startOfDay(this.form.controls.entryDate.value).getTime()
      : false;

  entryDateDisabledDateTime: DisabledTimeFn = date => ({
    nzDisabledHours: () => {
      if (!date) {
        return [];
      }
      const now = new Date();
      if (!Array.isArray(date)) {
        return isToday(date) ? range(0, now.getHours()) : [];
      }

      return [];
    },
    nzDisabledMinutes: () => {
      if (!date) {
        return [];
      }
      const now = new Date();
      if (!Array.isArray(date)) {
        return isToday(date) && date.getHours() <= now.getHours() ? range(0, now.getMinutes()) : [];
      }

      return [];
    },
    nzDisabledSeconds: () => {
      if (!date) {
        return [];
      }

      const now = new Date();
      if (!Array.isArray(date)) {
        return isToday(date) && date.getMinutes() <= now.getMinutes() ? range(0, now.getSeconds()) : [];
      }

      return [];
    },
  });
  isSameDayWithEntry = (date: Date | Date[], entryDate?: Date | null) =>
    entryDate && !Array.isArray(date) && isSameDay(entryDate, date);
  exitDateDisabledDateTime: DisabledTimeFn = date => ({
    nzDisabledHours: () =>
      this.isSameDayWithEntry(date, this.form.controls.entryDate.value)
        ? range(0, this.form.controls.entryDate.value!.getHours())
        : [],
    nzDisabledMinutes: () =>
      this.isSameDayWithEntry(date, this.form.controls.entryDate.value)
        ? range(0, this.form.controls.entryDate.value!.getMinutes())
        : [],
    nzDisabledSeconds: () =>
      this.isSameDayWithEntry(date, this.form.controls.entryDate.value)
        ? range(0, this.form.controls.entryDate.value!.getSeconds())
        : [],
  });
  errors = Errors;

  ngOnInit() {
    this.title = this.data ? 'Edit' : 'Create';

    if (this.data) {
      this.form.setValue({
        entryDate: new Date(this.data.entryDate),
        entryPrice: this.data.entryPrice,
        exitDate: new Date(this.data.exitDate),
        exitPrice: this.data.exitPrice,
        id: this.data.id,
        ticker: this.data.ticker,
        quantity: this.data.quantity,
      });
    }
  }

  send() {
    if (this.form.invalid) {
      updateValueAndValidity(this.form);
      return;
    }

    this.submit.emit(this.form.getRawValue() as ITradeFrom);
  }
}
