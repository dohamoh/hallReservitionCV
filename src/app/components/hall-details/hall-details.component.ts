import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hall-details',
  templateUrl: './hall-details.component.html',
  styleUrls: ['./hall-details.component.scss']
})
export class HallDetailsComponent {
  @Input()hallData:any
}
