import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TvElement, MediaLinks } from '../_interface/tv-element.model';
import { TvService } from './../shared/tv.service';
import { TvDialogComponent } from './tv-dialog/tv-dialog.component';
@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {
  public dramaDisplayedColumns: string[] = ['index', 'medianame'];
  public dramaDataSource = new MatTableDataSource<TvElement>();
  public entertainmentDisplayedColumns: string[] = ['index', 'medianame'];
  public entertainmentDataSource = new MatTableDataSource<TvElement>();
  public documentaryDisplayedColumns: string[] = ['index', 'medianame'];
  public documentaryDataSource = new MatTableDataSource<TvElement>();
  public newsDisplayedColumns: string[] = ['index', 'medianame'];
  public newsDataSource = new MatTableDataSource<TvElement>();
  
  constructor(private tvService: TvService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getChannels("drama");
    this.getChannels("entertainment");
    this.getChannels("documentary");
    this.getChannels("news");
  }
  public openDialog = (links: MediaLinks[]) => {
    const dialogRef = this.dialog.open(TvDialogComponent, {
        width: '250px',
        data: links
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public getChannels = (channel:string) => {
    this.tvService.get(channel)
    .subscribe(res => {
      switch(channel)
      {
        case "drama":
          this.dramaDataSource.data = res as TvElement[];
          console.log(this.dramaDataSource.data);
          break;
        case "entertainment":
          this.entertainmentDataSource.data = res as TvElement[];
          console.log(this.entertainmentDataSource.data);
          break;
        case "documentary":
          this.documentaryDataSource.data = res as TvElement[];
          console.log(this.documentaryDataSource.data);
          break;
        case "news":
          this.newsDataSource.data = res as TvElement[];
          console.log(this.newsDataSource.data);
          break;
      }
    })
  }
}
