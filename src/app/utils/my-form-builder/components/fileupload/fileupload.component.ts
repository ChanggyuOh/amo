import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../field.interface";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, 
         HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { FileUploadModel } from '../../../../shared/material-file-upload/material-file-upload.component';

@Component({
  selector: "app-uploader",
  template: `
  <div class="demo-full-width margin-top" [formGroup]="group">
  {{text}}:
    <button mat-button color="warn" (click)="onClick()">
    <mat-icon>file_upload</mat-icon>
    </button>
    <button mat-button color="warn" (click)="onPicClick()">
    camera
    </button>
    <span>
        {{uploadedFileName}}
    </span>
    <ul>
        <li *ngFor="let file of files" [@fadeInOut]="file.state">
                <mat-progress-bar [value]="file.progress"></mat-progress-bar>
                <span id="file-label">
                {{file.data.name}} 
                <a title="Retry" (click)="retryFile(file)" *ngIf="file.canRetry">
                refresh</a>
                <a title="Cancel" (click)="cancelFile(file)" *ngIf="file.canCancel">
                cancel</a>
                </span>
        </li>
    </ul>
    <input type="file" id="fileUpload" name="fileUpload" multiple="multiple" 
accept="{{accept}}" style="display:none;"/>
    <input type="file" capture="camera" accept="{{accept}}" id="cameraInput" name="cameraInput" (change)="onFileSelected($event)" style="display:none;">
</div>
`,
  styles: []
})
export class MyFileUploadComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    uploadedFileName: string;
    /** Link text */
    @Input() text = 'Upload';
    /** Name used in form which will be sent in HTTP request. */
    @Input() param = 'file';
    /** Target URL for file uploading. */
    @Input() target = environment.urlAddress+'/resource';
    /** File extension that accepted, same as 'accept' of <input type="file" />. 
         By the default, it's set to 'image/*'. */
    @Input() accept = 'image/*';
    /** Allow you to add handler after its completion. Bubble up response text from remote. */
    @Output() complete = new EventEmitter<string>();

    public files: Array<FileUploadModel> = [];
    constructor(private _http: HttpClient) { }
    ngOnInit() {}
    onClick() {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
                for (let index = 0; index < fileUpload.files.length; index++) {
                    const file = fileUpload.files[index];
                    this.files.push({ data: file, state: 'in', 
                        inProgress: false, progress: 0, canRetry: false, canCancel: true });
                }
                this.uploadFiles();
        };
        fileUpload.click();
    }
    onPicClick(){
        const capturedImage = document.getElementById('cameraInput') as HTMLInputElement;
        capturedImage.click();            
    }
    onFileSelected(event){
        var capture = { data: event.target.files[0], state: 'in', inProgress: false, progress: 0, canRetry: false, canCancel: true };
        this.uploadFile(capture);
    }

    cancelFile(file: FileUploadModel) {
        file.sub.unsubscribe();
        this.removeFileFromArray(file);
    }

    retryFile(file: FileUploadModel) {
        this.uploadFile(file);
        file.canRetry = false;
    }

    private uploadFile(file: FileUploadModel) {
        const fd = new FormData();
        fd.append(this.param, file.data);

        const req = new HttpRequest('POST', this.target, fd, {
                reportProgress: true
        });

        file.inProgress = true;
        file.sub = this._http.request(req).pipe(
                map(event => {
                    switch (event.type) {
                            case HttpEventType.UploadProgress:
                                file.progress = Math.round(event.loaded * 100 / event.total);
                                break;
                            case HttpEventType.Response:
                                return event;
                    }
                }),
                tap(message => { }),
                last(),
                catchError((error: HttpErrorResponse) => {
                    file.inProgress = false;
                    file.canRetry = true;
                    return of(`${file.data.name} upload failed.`);
                })
        ).subscribe(
                (event: any) => {
                    if (typeof (event) === 'object') {
                            this.uploadedFileName = file.data.name;
                            this.removeFileFromArray(file);
                            this.complete.emit(event.body);
                    }
                }
        );
    }

    private uploadFiles() {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.value = '';

        this.files.forEach(file => {
                this.uploadFile(file);
        });
    }

    private removeFileFromArray(file: FileUploadModel) {
        const index = this.files.indexOf(file);
        if (index > -1) {
                this.files.splice(index, 1);
        }
    }
}