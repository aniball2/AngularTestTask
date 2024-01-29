import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { routes } from './trade.routes';
import { icons } from '../icons-provider';
import { TradePageComponent } from './pages/trades-page/trade-page.component';
import { TradeTableComponent } from './components/trade-table/trade-table.component';
import { TradeFormComponent } from './components/trade-form/trade-form.component';
import { TradeChartComponent } from './components/trade-chart/trade-chart.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { AmountOfProfitPipe } from './pipes/amount-of-profit.pipe';

@NgModule({
  declarations: [
    TradePageComponent,
    TradeTableComponent,
    TradeFormComponent,
    TradeChartComponent,
    ChartPageComponent,
    AmountOfProfitPipe,
  ],
  imports: [
    CommonModule,
    NzTableModule,
    ReactiveFormsModule,
    NzFormModule,
    NzDatePickerModule,
    NzGridModule,
    NzInputNumberModule,
    NzButtonModule,
    NzIconModule.forRoot(icons),
    NzPopconfirmModule,
    NzModalModule,
    NgApexchartsModule,
    NzEmptyModule,
    NzSelectModule,
  ],
  providers: [provideRouter(routes)],
})
export class TradeModule {}
