import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QrGenComponent } from '../qr-gen/qr-gen.component';
import { MyFlowyComponent } from '../my-flowy/my-flowy.component';
import { MyFileExplorerComponent } from '../my-file-explorer/my-file-explorer.component';
import { MyEditorComponent } from '../my-editor/my-editor.component';

const routes: Routes = [
  { path: 'qr-gen', component: QrGenComponent },
  { path: 'flowy', component: MyFlowyComponent },
  { path: 'my-file-explorer', component: MyFileExplorerComponent },
  { path: 'editor', component: MyEditorComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UtilsRoutingModule { }
