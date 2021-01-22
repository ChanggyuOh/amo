import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileUploadComponent } from './material-file-upload/material-file-upload.component';
import { MaterialModule } from './../material/material.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [MaterialFileUploadComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  exports:[
    MaterialFileUploadComponent,
  ]
})
export class SharedModule { }
