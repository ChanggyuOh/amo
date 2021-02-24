import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QrGenComponent } from '../qr-gen/qr-gen.component';
import { MyFlowyComponent } from '../my-flowy/my-flowy.component';
import { MyFileExplorerComponent } from '../my-file-explorer/my-file-explorer.component';
import { MyEditorComponent } from '../my-editor/my-editor.component';
import { MyDynamicFormComponent } from '../my-dynamic-form/my-dynamic-form.component';
import { BlocklyComponent } from '../blockly/blockly.component';
import { ShaderComponent } from '../shader/shader.component';
import { TerminelComponent } from '../terminel/terminel.component';
import { MyFormBuilderComponent} from '../my-form-builder/my-form-builder.component';
import { MyFormViewerComponent} from '../my-form-viewer/my-form-viewer.component';

const routes: Routes = [
  { path: 'qr-gen', component: QrGenComponent },
  { path: 'term', component: TerminelComponent },
  { path: 'flowy', component: MyFlowyComponent },
  { path: 'my-file-explorer', component: MyFileExplorerComponent },
  { path: 'editor', component: MyEditorComponent },
  { path: 'form-builder', component: MyFormBuilderComponent },
  { path: 'form-viewer', component: MyFormViewerComponent },
  { path: 'blockly', component: BlocklyComponent},
  { path: 'shader', component: ShaderComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UtilsRoutingModule { }
