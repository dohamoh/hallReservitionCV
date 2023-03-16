import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hall-details',
  templateUrl: './hall-details.component.html',
  styleUrls: ['./hall-details.component.scss']
})
export class HallDetailsComponent {
  confirmDeletion:Boolean=false
  editHall:Boolean=false
  @Input()hallData:any

  @Output() closeHallDetails:EventEmitter<any> = new EventEmitter<any>();

  closeDetails() {
    this.closeHallDetails.emit('');
  }
  closeConfirmDeletion(data:any){
    this.confirmDeletion = data
  }
  closeEditPage(data:any){
    this.editHall = data
  }
}
