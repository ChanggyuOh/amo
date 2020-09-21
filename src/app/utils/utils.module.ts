import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrGenComponent } from './qr-gen/qr-gen.component';
import { UtilsRoutingModule } from './utils-routing/utils-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { MaterialModule } from './../material/material.module';
import { FormsModule } from '@angular/forms';
import  {MyFlowyComponent } from './my-flowy/my-flowy.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { NewFolderDialogComponent } from './file-explorer/modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './file-explorer/modals/rename-dialog/rename-dialog.component';
import { MyFileExplorerComponent } from './my-file-explorer/my-file-explorer.component';

@NgModule({
  declarations: [QrGenComponent, MyFlowyComponent, FileExplorerComponent, NewFolderDialogComponent, RenameDialogComponent, MyFileExplorerComponent],
  imports: [
    CommonModule,
    UtilsRoutingModule,
    NgxQRCodeModule,
    MaterialModule,
    FormsModule,
  ]
})
export class UtilsModule { }
