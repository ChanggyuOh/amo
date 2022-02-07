import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { DynamicFormDialogComponent } from './dynamic-form-dialog/dynamic-form-dialog.component';
import { BlocklyComponent } from './blockly/blockly.component';
import { NgxBlocklyModule } from 'ngx-blockly';
import { EditorDialogComponent } from './my-editor/editor-dialog/editor-dialog.component';
import { AngularSplitModule } from 'angular-split';
import { ShaderComponent } from './shader/shader.component';
import { TerminelComponent } from './terminel/terminel.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgTerminalModule } from 'ng-terminal';
import { MyFormBuilderComponent } from './my-form-builder/my-form-builder.component';
import { InputComponent } from './my-form-builder/components/input/input.component';
import { MyTextAreaComponent } from './my-form-builder/components/input/textarea.component';
import { ButtonComponent } from './my-form-builder/components/button/button.component';
import { SelectComponent } from './my-form-builder/components/select/select.component';
import { DateComponent } from './my-form-builder/components/date/date.component';
import { RadiobuttonComponent } from './my-form-builder/components/radiobutton/radiobutton.component';
import { CheckboxComponent } from './my-form-builder/components/checkbox/checkbox.component';
import { FileUploadComponent } from './my-form-builder/components/fileupload/fileupload.old.component';
import { MyFileUploadComponent } from './my-form-builder/components/fileupload/fileupload.component';
import { DynamicFieldDirective } from './my-form-builder/components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './my-form-builder/components/dynamic-form/dynamic-form.component';
import { MyFormViewerComponent } from './my-form-viewer/my-form-viewer.component'
import { AnchorDirective } from './my-form-viewer/anchor.directive';
import { TournamentBracketComponent } from './tournament-bracket/tournament-bracket.component';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { RtcSignalRService} from '../shared/rtc-signalr.service';
import { ChatSignalRService} from '../shared/chat-signalr.service';
import { ChatMemberComponent } from './video-chat/chat-member/chat-member.component';
import { VideoChatRoomComponent } from './video-chat/video-chat-room/video-chat-room.component';
import { MyLogService } from '../shared/log.service';

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
  declarations: [QrGenComponent, MyFlowyComponent, FileExplorerComponent, NewFolderDialogComponent, RenameDialogComponent, MyFileExplorerComponent, MyEditorComponent, DynamicFormDialogComponent, BlocklyComponent, EditorDialogComponent, ShaderComponent, TerminelComponent, MyFormBuilderComponent, InputComponent, MyTextAreaComponent, MyFileUploadComponent,
    ButtonComponent,SelectComponent, DateComponent, RadiobuttonComponent, CheckboxComponent, DynamicFieldDirective, DynamicFormComponent, MyFormViewerComponent, AnchorDirective, TournamentBracketComponent, VideoChatComponent, ChatMemberComponent, VideoChatRoomComponent],
  imports: [
    CommonModule,
    UtilsRoutingModule,
    AngularSplitModule,
    NgxQRCodeModule,
    MaterialModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    NgxBlocklyModule,
    NgxJsonViewerModule,
    NgTerminalModule,
    MonacoEditorModule.forRoot(monacoConfig),
  ],
  providers:[
    ChatSignalRService,
    RtcSignalRService,
    MyLogService,
  ],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    FileUploadComponent
  ],
  exports:[
    TournamentBracketComponent
  ]
})
export class UtilsModule { }
