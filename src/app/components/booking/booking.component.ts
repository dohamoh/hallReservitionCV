import { Component, ElementRef } from '@angular/core';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  meeting='نوع اللقاء'
  constructor(private elementRef: ElementRef){}
  type(event: any) {
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('.activeType');
    if (elements.length != 0) {
      elements[0].classList.remove('activeType');
    }
    this.meeting = event.target.innerHTML;
    event.target.classList.add('activeType');

  }

}
