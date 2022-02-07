import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DogecoinChartComponent} from './dogecoin-chart/dogecoin-chart.component';
const routes: Routes = [
  { path: 'dogecoin', component: DogecoinChartComponent },
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ]
  })

export class FinanceRoutingModule { }
