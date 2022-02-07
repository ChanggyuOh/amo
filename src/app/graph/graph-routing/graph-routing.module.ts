import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GraphEditorComponent } from '../graph-editor/graph-editor.component';
const routes: Routes = [
  { path: 'editor', component: GraphEditorComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GraphRoutingModule { }
