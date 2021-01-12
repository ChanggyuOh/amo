import { Component, Input, OnInit, OnChanges, ViewChild  } from '@angular/core';
import { FeedItem } from '../../_interface/feed-item.model';
// import Swiper core and required components
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';
import { PaginationOptions } from 'swiper/types/components/pagination';
import { ScrollbarOptions } from 'swiper/types/components/scrollbar';

@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.css']
})
export class CarousalComponent implements OnInit {
  @Input() data: FeedItem[];

  public show: boolean = true;
  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];
  public type: string = 'component';

  public disabled: boolean = false;

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    autoplay: {delay: 1000, stopOnLastSlide: false, reverseDirection: false, disableOnInteraction: true},
    slidesPerView: 3,
    //slidesPerGroup:5,
    centeredSlides:false,
    loop: true,
    loopedSlides:10,
    //loopFillGroupWithBlank: true,
    keyboard: true,
    mousewheel: true,
    scrollbar: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'swiper-button-disabled'
      },
      breakpoints:{
            // when window width is <= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        // when window width is <= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      },
    pagination: true
  };

  private scrollbar: ScrollbarOptions = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: PaginationOptions = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  constructor( ) { }

  ngOnInit(): void {
  }
  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleDirection(): void {
    this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView(): void {
    if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
    } else {
      this.config.slidesPerView = 2;
    }
  }

  public toggleOverlayControls(): void {
    if (this.config.navigation) {
      this.config.scrollbar = false;
      this.config.navigation = false;

      this.config.pagination = this.pagination;
    } else if (this.config.pagination) {
      this.config.navigation = false;
      this.config.pagination = false;

      this.config.scrollbar = this.scrollbar;
    } else {
      this.config.scrollbar = false;
      this.config.pagination = false;

      this.config.navigation = true;
    }

    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.setIndex(0);
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.setIndex(0);
    }
  }

  public toggleKeyboardControl(): void {
    this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl(): void {
    this.config.mousewheel = !this.config.mousewheel;
  }

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }
}
