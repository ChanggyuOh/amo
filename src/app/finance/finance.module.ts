import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance.component';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from './../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FinanceRoutingModule } from './finance.routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { DogecoinChartComponent } from './dogecoin-chart/dogecoin-chart.component';

@NgModule({
  declarations: [FinanceComponent, DogecoinChartComponent],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ]
})
export class FinanceModule { }
