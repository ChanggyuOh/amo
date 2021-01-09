import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  index: number;
  channel: string;
  link: string;
  linktitle: string;
}

const DRAMA_DATA: PeriodicElement[] = [
  {index: 1, linktitle:'link1', channel: 'Hydrogen', link: 'H'},
  {index: 2, linktitle:'link2', channel: 'Helium', link: 'He'},
  {index: 3, linktitle:'link3', channel: 'Lithium', link: 'Li'},
  {index: 4, linktitle:'link4', channel: 'Beryllium', link: 'Be'},
  {index: 5, linktitle:'link5', channel: 'Boron', link: 'B'},
  {index: 6, linktitle:'link6', channel: 'Carbon', link: 'C'},
  {index: 7, linktitle:'link7', channel: 'Nitrogen', link: 'N'},
  {index: 8, linktitle:'link8', channel: 'Oxygen', link: 'O'},
  {index: 9, linktitle:'link9', channel: 'Fluorine', link: 'F'},
  {index: 10,linktitle:'link0', channel: 'Neon', link: 'Ne'},
];

const ENTERTAINMENT_DATA: PeriodicElement[] = [
  {index: 1, linktitle:'link1', channel: 'Hydrogen', link: 'H'},
  {index: 2, linktitle:'link2', channel: 'Helium', link: 'He'},
  {index: 3, linktitle:'link3', channel: 'Lithium', link: 'Li'},
  {index: 4, linktitle:'link4', channel: 'Beryllium', link: 'Be'},
  {index: 5, linktitle:'link5', channel: 'Boron', link: 'B'},
  {index: 6, linktitle:'link6', channel: 'Carbon', link: 'C'},
  {index: 7, linktitle:'link7', channel: 'Nitrogen', link: 'N'},
  {index: 8, linktitle:'link8', channel: 'Oxygen', link: 'O'},
  {index: 9, linktitle:'link9', channel: 'Fluorine', link: 'F'},
  {index: 10,linktitle:'link0', channel: 'Neon', link: 'Ne'},
];
const DOCUMENTARY_DATA: PeriodicElement[] = [
  {index: 1, linktitle:'link1', channel: 'Hydrogen', link: 'H'},
  {index: 2, linktitle:'link2', channel: 'Helium', link: 'He'},
  {index: 3, linktitle:'link3', channel: 'Lithium', link: 'Li'},
  {index: 4, linktitle:'link4', channel: 'Beryllium', link: 'Be'},
  {index: 5, linktitle:'link5', channel: 'Boron', link: 'B'},
  {index: 6, linktitle:'link6', channel: 'Carbon', link: 'C'},
  {index: 7, linktitle:'link7', channel: 'Nitrogen', link: 'N'},
  {index: 8, linktitle:'link8', channel: 'Oxygen', link: 'O'},
  {index: 9, linktitle:'link9', channel: 'Fluorine', link: 'F'},
  {index: 10,linktitle:'link0', channel: 'Neon', link: 'Ne'},
];
const NEWS_DATA: PeriodicElement[] = [
  {index: 1, linktitle:'link1', channel: 'Hydrogen', link: 'https://google.com'},
  {index: 2, linktitle:'link2', channel: 'Helium', link: 'He'},
  {index: 3, linktitle:'link3', channel: 'Lithium', link: 'Li'},
  {index: 4, linktitle:'link4', channel: 'Beryllium', link: 'Be'},
  {index: 5, linktitle:'link5', channel: 'Boron', link: 'B'},
  {index: 6, linktitle:'link6', channel: 'Carbon', link: 'C'},
  {index: 7, linktitle:'link7', channel: 'Nitrogen', link: 'N'},
  {index: 8, linktitle:'link8', channel: 'Oxygen', link: 'O'},
  {index: 9, linktitle:'link9', channel: 'Fluorine', link: 'F'},
  {index: 10,linktitle:'link0', channel: 'Neon', link: 'Ne'},
];
@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {
  dramaDisplayedColumns: string[] = ['index', 'channel', 'link'];
  dramaDataSource = DRAMA_DATA;
  entertainmentDisplayedColumns: string[] = ['index', 'channel', 'link'];
  entertainmentDataSource = ENTERTAINMENT_DATA;
  documentaryDisplayedColumns: string[] = ['index', 'channel', 'link'];
  documentaryDataSource = DOCUMENTARY_DATA;
  newsDisplayedColumns: string[] = ['index', 'channel', 'link'];
  newsDataSource = NEWS_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
