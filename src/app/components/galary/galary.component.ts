import { Component } from '@angular/core';

@Component({
  selector: 'app-galary',
  templateUrl: './galary.component.html',
  styleUrls: ['./galary.component.scss']
})
export class GalaryComponent {
  disPlayHall: any = ''

  getSrc(event: any) {
   this.disPlayHall = event.target.parentElement.children[0].attributes.src.nodeValue
 }
 closeDetails() {
   this.disPlayHall = ''
 }
}
