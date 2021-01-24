import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SharedModule } from '../shared/shared.module';
import { DebateRoutingModule } from './debate-routing.module';
import { PeopleDebateComponent } from './people-debate/people-debate.component';
import { PeopleDebateListComponent } from './people-debate-list/people-debate-list.component';
import { CandidateDialogComponent } from './candidate-dialog/candidate-dialog.component';

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
// SwiperOptions from 'swiper' could also be used here instead of SwiperConfigInterface
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
};

@NgModule({
  declarations: [PeopleDebateListComponent,PeopleDebateComponent, SafePipe, CandidateDialogComponent],
  imports: [
    CommonModule,
    DebateRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SwiperModule,
    QuillModule.forRoot(),
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
})
export class DebateModule { }
