import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'currency-converter',
    loadChildren: () => import('./pages/currency/currency.module').then(m => m.CurrencyModule)
  },
  {
    path: 'unit-converter',
    loadChildren: () => import('./pages/unit/unit.module').then(m => m.UnitModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'currency-converter'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
