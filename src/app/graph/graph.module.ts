import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphEditorComponent } from './graph-editor/graph-editor.component';
import { ImageKitComponent } from './image-kit/image-kit.component';
import { GraphRoutingModule } from './graph-routing/graph-routing.module'



@NgModule({
  declarations: [GraphEditorComponent, ImageKitComponent],
  imports: [
    CommonModule,
    GraphRoutingModule
  ]
})
export class GraphModule { }
