import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider-holder',
  templateUrl: './slider-holder.component.html',
  styleUrls: ['./slider-holder.component.scss']
})
export class SliderHolderComponent {
  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 1
  //     },
  //     740: {
  //       items: 1
  //     },
  //     940: {
  //       items: 1
  //     }
  //   },
  //   nav: true
  // }
  customOptions: OwlOptions = {
    loop: true,

    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    autoplaySpeed: 950,
    dotsSpeed: 500,
    autoplayMouseleaveTimeout: 1100,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,

    smartSpeed: 400,
    dragEndSpeed: 350,
    rtl:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
}
