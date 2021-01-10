import { Component, Input, OnInit, OnChanges, ChangeDetectorRef  } from '@angular/core';
import { FeedItem } from '../../_interface/feed-item.model';
@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.css']
})
export class CarousalComponent implements OnInit, OnChanges {
  @Input() data: FeedItem[];

  constructor(public ref: ChangeDetectorRef ) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    console.log(this.data);
    this.ref.markForCheck();
  }
}
