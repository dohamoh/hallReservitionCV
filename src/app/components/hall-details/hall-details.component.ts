import { SharedService } from './../../services/shared.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-hall-details',
  templateUrl: './hall-details.component.html',
  styleUrls: ['./hall-details.component.scss']
})
export class HallDetailsComponent implements OnInit {

  confirmDeletion:Boolean=false
  userData: any;
  editHall:Boolean=false
  constructor(private SharedService:SharedService){}
  ngOnInit(): void {
    this.SharedService.currentUserData.subscribe((data: any) => {
      this.userData = data;
 
    });
  }

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
