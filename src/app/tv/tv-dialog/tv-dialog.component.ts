import { Component, OnInit, Inject } from '@angular/core';
import { MediaLinks } from '../../_interface/tv-element.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { TvService } from 'src/app/shared/tv.service';

@Component({
  selector: 'app-tv-dialog',
  templateUrl: './tv-dialog.component.html',
  styleUrls: ['./tv-dialog.component.css']
})
export class TvDialogComponent implements OnInit {
  public displayedColumns: string[] = ['link'];
  constructor(
    public dialogRef: MatDialogRef<TvDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataSource: MediaLinks[],
    private tvService: TvService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.dataSource);
  }
}

