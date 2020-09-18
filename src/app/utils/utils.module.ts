import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrGenComponent } from './qr-gen/qr-gen.component';
import { UtilsRoutingModule } from './utils-routing/utils-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { MaterialModule } from './../material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [QrGenComponent],
  imports: [
    CommonModule,
    UtilsRoutingModule,
    NgxQRCodeModule,
    MaterialModule,
    FormsModule,
  ]
})
export class UtilsModule { }
