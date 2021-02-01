import { Component, OnInit, Inject, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-editor-dialog',
  templateUrl: './editor-dialog.component.html',
  styleUrls: ['./editor-dialog.component.css']
})
export class EditorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

     }

  ngOnInit(): void {
  }

}
