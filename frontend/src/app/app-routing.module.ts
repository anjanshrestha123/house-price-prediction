import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousePricePredictionComponent } from './house-price-prediction/house-price-prediction.component';

const routes: Routes = [
  { path: 'house-price-prediction', component: HousePricePredictionComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/house-price-prediction' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
