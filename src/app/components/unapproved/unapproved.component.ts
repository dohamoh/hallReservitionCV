import { SharedService } from './../../services/shared.service';
import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html',
  styleUrls: ['./unapproved.component.scss'],
})
export class UnapprovedComponent {
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
            (element: any) => element.status == 'Unapproved'
          );

        });
      } else {
        this.reservations = data.reservations?.filter(
          (element: any) => element.status == 'Unapproved'
        );

      }

    });
  }
  OnHoldReservation(id: Object) {


    this.loading = !this.loading;
    this.ReservationService.OnHoldReservation(id).subscribe((data: any) => {
      if (data.message == 'on hold') {
        this.SharedService.updateAllData();
        this.loading = !this.loading;
      }
    });
  }
}
