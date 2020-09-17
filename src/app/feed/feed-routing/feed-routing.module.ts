import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FeedListComponent } from '../feed-list/feed-list.component';
import { MyFeedListComponent } from '../my-feed-list/my-feed-list.component';

const routes: Routes = [
  { path: 'feeds', component: FeedListComponent },
  { path: 'my-feed', component: MyFeedListComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FeedRoutingModule { }
