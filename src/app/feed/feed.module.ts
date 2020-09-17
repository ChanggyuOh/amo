import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedRoutingModule } from './feed-routing/feed-routing.module';
import { MaterialModule } from './../material/material.module';
import { FormsModule } from '@angular/forms';
import { MyFeedListComponent } from './my-feed-list/my-feed-list.component';
import { MyFeedDialogComponent } from './my-feed-dialog/my-feed-dialog.component';
import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [FeedListComponent, MyFeedListComponent, MyFeedDialogComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    MaterialModule,
    FormsModule,
    QuillModule.forRoot()
  ]
})
export class FeedModule { }
