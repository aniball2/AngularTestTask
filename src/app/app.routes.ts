import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/trades' },
  { path: 'trades', loadChildren: () => import('./trade/trade.module').then(m => m.TradeModule) },
];
