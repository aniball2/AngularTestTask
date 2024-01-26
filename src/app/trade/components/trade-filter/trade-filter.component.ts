import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-trade-filter',
  templateUrl: './trade-filter.component.html',
  styleUrl: './trade-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeFilterComponent implements OnInit {
  @Output() updateFilters = new EventEmitter();
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    entryDate: this.fb.control(null),
    exitDate: this.fb.control(null),
    entryPrice: this.fb.control(null),
    exitPrice: this.fb.control(null),
    profit: this.fb.control(null),
  });

  ngOnInit() {
    this.form.valueChanges.pipe(debounceTime(80)).subscribe(value => {
      this.updateFilters.emit(value);
    });
  }

  reset() {
    this.form.reset();
    this.updateFilters.emit(this.form.value);
  }
}
