import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePageComponent } from './trade-page.component';

describe('TradesComponent', () => {
  let component: TradePageComponent;
  let fixture: ComponentFixture<TradePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TradePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
