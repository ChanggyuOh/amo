import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-qr-gen',
  templateUrl: './qr-gen.component.html',
  styleUrls: ['./qr-gen.component.css']
})
export class QrGenComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  qrValue: string = 'https://www.jumdle.com/';

  constructor() { }

  ngOnInit(): void {
  }

}
