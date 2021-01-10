import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedRoutingModule } from './feed-routing/feed-routing.module';
import { MaterialModule } from './../material/material.module';
import { FormsModule } from '@angular/forms';
import { MyFeedListComponent } from './my-feed-list/my-feed-list.component';
import { MyFeedDialogComponent } from './my-feed-dialog/my-feed-dialog.component';
import { QuillModule } from 'ngx-quill'
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { BpmnDialogComponent } from './bpmn-dialog/bpmn-dialog.component';
import { DiagramComponent } from './diagram/diagram.component';
import { CarousalComponent } from './carousal/carousal.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(myVal: string, myType: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    //console.log("myVal:"+myVal);
    //console.log("myType:"+myType);
    switch (myType) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(myVal);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(myVal);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(myVal);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(myVal);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(myVal);
      default:
        return this.sanitizer.bypassSecurityTrustHtml(myVal);
    }
  }
} 

@NgModule({
  declarations: [FeedListComponent, MyFeedListComponent, MyFeedDialogComponent, SafePipe, BpmnDialogComponent, DiagramComponent, CarousalComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    MaterialModule,
    FormsModule,
    QuillModule.forRoot(),
    IvyCarouselModule
  ]
})
export class FeedModule { }
