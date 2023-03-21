import { SharedService } from './../../services/shared.service';
import { Component, Input } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent {
  constructor(
    private ReservationService: ReservationService,
    private SharedService: SharedService
  ) {}
  loading: Boolean = false;

  reservations: any;
  userData: any;
  ngOnInit(): void {
    this.SharedService.currentUserData.subscribe((data: any) => {
      this.userData = data;
      if (data.role == 'Admin') {
        this.ReservationService.getAllReservation().subscribe((data: any) => {
          this.reservations = data.allReservations?.filter(
            (element: any) => element.status == 'Approved'
          );

        });
      } else {
        this.reservations = data.reservations?.filter(
          (element: any) => element.status == 'Approved'
        );

      }
    });
  }

  OnHoldReservation(id: Object) {
    console.log(id);

    this.loading = !this.loading;
    this.ReservationService.OnHoldReservation(id).subscribe((data: any) => {
      if (data.message == 'on hold') {
        this.SharedService.updateAllData();
        this.loading = !this.loading;
      }
    });
  }
}
