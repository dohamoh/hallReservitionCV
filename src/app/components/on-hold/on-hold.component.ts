import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-on-hold',
  templateUrl: './on-hold.component.html',
  styleUrls: ['./on-hold.component.scss'],
})
export class OnHoldComponent {
  loading: Boolean = false;
  userData: any;
  reservations: any;
  constructor(
    private ReservationService: ReservationService,
    private SharedService: SharedService
  ) {}

ngOnInit(): void {
    this.SharedService.currentUserData.subscribe((data: any) => {
      this.userData = data;
      if (data.role == 'Admin') {
        this.ReservationService.getAllReservation().subscribe((data: any) => {
          this.reservations = data.allReservations?.filter(
            (element: any) => element.status == 'On hold'
          );

        });
      } else {
        this.reservations = data.reservations?.filter(
                (element: any) => element.status == 'On hold'

              );

      }

    });
  }

  UnapprovedReservation(id: Object) {
    this.loading = !this.loading;
    this.ReservationService.UnapprovedReservation(id).subscribe((data: any) => {
      this.ReservationService.sendUnapproved(id).subscribe((data:any)=>{

      })
      if (data.message == 'Unapproved') {
        this.SharedService.updateAllData();
        setTimeout(() => {
          this.loading = !this.loading;
        }, 2000);
      }
    },  (err: HttpErrorResponse) => {
      this.loading = false

    });
  }
  Cancel(id: Object) {
    this.loading = !this.loading;
    this.ReservationService.CancelReservation(id).subscribe((data: any) => {
      if (data.message == 'Canceled') {
        this.SharedService.updateAllData();
        this.loading = !this.loading;
      }
    });
  }
  ApprovedReservation(id: Object) {


    this.loading = !this.loading;
    this.ReservationService.ApprovedReservation(id).subscribe((data: any) => {
      if (data.message == 'Approved') {
        this.ReservationService.sendApproved(id).subscribe((data:any)=>{

        })
        this.SharedService.updateAllData();
        setTimeout(() => {
          this.loading = !this.loading;
        }, 2000);
      }
    },  (err: HttpErrorResponse) => {
      this.loading =false

    });
  }
}
