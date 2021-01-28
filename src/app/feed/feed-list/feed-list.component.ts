import { Component, OnDestroy, OnInit} from '@angular/core';
import { RepositoryService } from '../../shared/repository.service';
import { map, tap } from 'rxjs/operators';
import { FeedItem } from '../../_interface/feed-item.model';
import { Subscription } from 'rxjs';
import { CarousalComponent } from '../carousal/carousal.component';
@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit, OnDestroy {
  title: string;
  details: string;
  cards: FeedItem[] = [];
  secondCards: FeedItem[] = [];
  thirdCards: FeedItem[] = [];
  ds1: Subscription;
  ds2: Subscription;
  ds3: Subscription;
  topCaroId: string = 'topCaroId';
  secondCaroId: string = 'secondCaroId';
  constructor(private repoService: RepositoryService) { }

  ngOnInit(): void {
    this.ds1 = this.repoService.getData('feeds/1/10',null)
    .pipe(
      map(response => response)
    )
    .subscribe((cards:FeedItem[]) => this.cards = cards);

    this.ds2 = this.repoService.getData('feeds/2/5',null)
    .pipe(
      map(response => response)
    )
    .subscribe((cards:FeedItem[]) => this.secondCards = cards);

    this.ds2 = this.repoService.getData('feeds/3/5',null)
    .pipe(
      map(response => response)
    )
    .subscribe((cards:FeedItem[]) => this.thirdCards = cards);
  }

  ngOnDestroy(): void{
    this.ds1.unsubscribe();
    this.ds2.unsubscribe();
    // this.ds3.unsubscribe();
  }
}
