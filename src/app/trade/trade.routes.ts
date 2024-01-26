import { Routes } from '@angular/router';
import { TradePageComponent } from './pages/trades-page/trade-page.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: TradePageComponent },
  { path: 'chart', pathMatch: 'full', component: ChartPageComponent },
];
