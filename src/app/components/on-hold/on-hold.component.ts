import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-on-hold',
  templateUrl: './on-hold.component.html',
  styleUrls: ['./on-hold.component.scss']
})
export class OnHoldComponent {
  loading:Boolean=false
  ifNoData:Boolean=false
  userData: any;
  reservations:any
  constructor(private ReservationService: ReservationService,private SharedService:SharedService) {}

  ngOnInit(): void {
    this.SharedService.currentUserData.subscribe((data:any)=>{
      this.userData = data
console.log(data);

      this.reservations=data.reservations?.filter((element:any) => element.status == 'On hold');
if (this.reservations?.length == 0) {
this.ifNoData = !this.ifNoData
}

    })


  }
  cancelReservation(id: Object) {
this.loading = !this.loading
    this.ReservationService.cancelReservation(id).subscribe((data: any) => {
      if (data.message == 'canceled') {
        this.SharedService.updateAllData()
        this.loading = !this.loading
      }
    });
  }
}
