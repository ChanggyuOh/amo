import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrGenComponent } from './qr-gen/qr-gen.component';
import { UtilsRoutingModule } from './utils-routing/utils-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { MaterialModule } from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  {MyFlowyComponent } from './my-flowy/my-flowy.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { NewFolderDialogComponent } from './file-explorer/modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './file-explorer/modals/rename-dialog/rename-dialog.component';
import { MyFileExplorerComponent } from './my-file-explorer/my-file-explorer.component';
import { MyEditorComponent } from './my-editor/my-editor.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
export function onMonacoLoad() {
 
  console.log((window as any).monaco);
  let monaco = (<any>window).monaco;
  const uri = monaco.Uri.parse('a://b/foo.json');
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [{
      uri: 'http://myserver/foo-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          p1: {
            enum: ['v1', 'v2']
          },
          p2: {
            $ref: 'http://myserver/bar-schema.json'
          }
        }
      }
    }, {
      uri: 'http://myserver/bar-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          q1: {
            enum: ['x1', 'x2']
          }
        }
      }
    }]
  });
 
}

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'vs', // configure base path for monaco editor default: './assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad
};

@NgModule({
  declarations: [QrGenComponent, MyFlowyComponent, FileExplorerComponent, NewFolderDialogComponent, RenameDialogComponent, MyFileExplorerComponent, MyEditorComponent],
  imports: [
    CommonModule,
    UtilsRoutingModule,
    NgxQRCodeModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(monacoConfig),
  ]
})
export class UtilsModule { }
