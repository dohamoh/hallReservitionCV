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
  ifNoData: Boolean = false;
  userData: any;
  reservations: any;
  constructor(
    private ReservationService: ReservationService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.SharedService.currentUserData.subscribe((data: any) => {
      this.userData = data;
      console.log(data);

      this.reservations = data.reservations?.filter(
        (element: any) => element.status == 'Unapproved'
      );
      if (this.reservations?.length == 0) {
        console.log(this.reservations);
        this.ifNoData = true;
      }
    });
  }
  cancelReservation(id: Object) {
    this.loading = !this.loading;
    this.ReservationService.cancelReservation(id).subscribe((data: any) => {
      if (data.message == 'canceled') {
        this.SharedService.updateAllData();
        this.loading = !this.loading;
      }
    });
  }
}
