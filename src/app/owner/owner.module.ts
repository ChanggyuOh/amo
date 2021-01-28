import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerRoutingModule } from './owner-routing/owner-routing.module';
import { MaterialModule } from './../material/material.module';


@NgModule({
  declarations: [OwnerListComponent],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MaterialModule
  ]
})
export class OwnerModule { }
