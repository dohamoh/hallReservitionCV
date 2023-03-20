import { Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { ReservationService } from './../../services/reservation.service';
import { Component, ElementRef, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  loading: Boolean = false;
  userData: any;
  allHalls: any;
  meeting = 'نوع اللقاء';
  file: any;
  encounterTime: any;
  reservationForm: FormGroup = new FormGroup({
    AdministrationName: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    members: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    encounterType: new FormControl(null, [Validators.required]),
    whatDoYouNeed: new FormControl(null),
    hallId: new FormControl(null, [Validators.required]),
  });

  constructor(
    private elementRef: ElementRef,
    private ReservationService: ReservationService,
    private SharedService: SharedService,
    private Router: Router
  ) {}
  ngOnInit(): void {
    this.SharedService.currentAllHalls.subscribe((data: any) => {
      this.allHalls = data;
    });

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    let date = yyyy + '-' + mm + '-' + dd;

    this.elementRef.nativeElement.querySelector('#date').min = date;
  }
  type(event: any) {
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('.activeType');
    if (elements.length != 0) {
      elements[0].classList.remove('activeType');
    }
    this.meeting = event.target.innerHTML;
    event.target.classList.add('activeType');
  }
  time(event: any) {
    this.encounterTime = event.target.innerHTML;
    console.log(this.encounterTime);
  }
  upload(event: any) {
    const file = event.target.files[0];
    this.file = file;
  }
  pdf() {


    let hall = this.allHalls?.filter(
      (element: any) => element._id == this.reservationForm.value.hallId
    );
//     let text = `
//  تم ارسال طلبك و جار مراجعته
//  اسم الادارة:${this.reservationForm.value.AdministrationName}
//  التاريخ:${this.reservationForm.value.date}
//  الوقت:${this.encounterTime}
//  السبب:${this.reservationForm.value.encounterType}
//  عدد الحضور:${this.reservationForm.value.members}
//  اسم القاعه: ${hall.hallName}
//  احتاج لــ:${this.reservationForm.value.whatDoYouNeed}


// `;
    const doc = new jsPDF();
    doc.getR2L()
    doc.text('هلا يا حب', 10, 10);
    doc.save('reservation.pdf');
  }
  reservation() {
    this.loading = !this.loading;
    const formData = new FormData();
    formData.append(
      'AdministrationName',
      this.reservationForm.value.AdministrationName
    );
    formData.append('members', this.reservationForm.value.members);
    formData.append('date', this.reservationForm.value.date);
    formData.append('encounterType', this.reservationForm.value.encounterType);
    formData.append('hallId', this.reservationForm.value.hallId);
    formData.append('encounterTime', this.encounterTime);
    formData.append('whatDoYouNeed', this.reservationForm.value.whatDoYouNeed);
    formData.append('file', this.file);

    this.ReservationService.addReservation(formData).subscribe((data: any) => {
      if (data.message == 'Reservation added') {
        if (  this.elementRef.nativeElement.querySelector('#pdfCheck').checked) {
          this.pdf()
        }
        this.loading = !this.loading;
        this.Router.navigate(['/userProfile']);
      }
    });
  }
}
