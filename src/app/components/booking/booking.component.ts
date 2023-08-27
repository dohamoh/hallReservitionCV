import { HallService } from './../../services/hall.service';
import { Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { ReservationService } from './../../services/reservation.service';
import { Component, ElementRef, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {

  private readonly pdfFonts: any;
  reservationForm: FormGroup = new FormGroup({
    AdministrationName: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    members: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(2),
    ]),
    date: new FormControl(null, [Validators.required]),
    encounterType: new FormControl(null, [Validators.required]),
    whatDoYouNeed: new FormControl(null),
    hallId: new FormControl(null, [Validators.required]),
  });
  pdfMake: any;
  loading: Boolean = false;
  addMessage: Boolean = false;
  isFile: Boolean = false;
  userData: any;
  allHalls: any;
  meeting = 'نوع اللقاء';
  file: any;
  member: any;
  hallAttendees: any;
  encounterTime: any = '8am-12pm';
  reservations:any[]=[]
  selectedDate: any;
  dropdownList: any = [];
  selectedItems: any = [];
  datemessage: any;

  dropdownSettings: any = {};
    disabledDates: Date[] = [new Date('2023-05-01'), new Date('2023-05-15'), new Date('2023-05-25')];

  constructor(
    private elementRef: ElementRef,
    private ReservationService: ReservationService,
    private SharedService: SharedService,
    private Router: Router,
    private HallService: HallService
  ) {}
  ngOnInit(): void {
    this.dropdownList = [
      { item_id: 1, item_text: 'جهاز عرض' },
      { item_id: 2, item_text: 'شاشة عرض' },
      { item_id: 3, item_text: 'طاولات' },
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',

      itemsShowLimit: 3,
      allowSearchFilter: false,
    };
    this.SharedService.currentUserData.subscribe((data: any) => {
      this.userData = data;
    });
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

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  setMember() {
    this.member = null;
    let hallAttendees = this.allHalls?.filter(
      (element: any) => element._id == this.reservationForm.value.hallId
    )[0].hallAttendees;

    this.hallAttendees = hallAttendees;
    this.reservationForm.controls['members'].setValidators([
      Validators.max(hallAttendees),
    ]);
    this.handelCalender();
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

    this.handelCalender();
  }
  upload(event: any) {
    const file = event.target.files[0];
    this.file = file;

    this.isFile = true;
  }
  removeFile() {
    this.file = '';
    this.isFile = false;
  }
  reservation() {
    let needs: any = [];
    for (let i = 0; i < this.selectedItems.length; i++) {
      const element = this.selectedItems[i];
      needs.push(element.item_text);
    }
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
    formData.append('whatDoYouNeed', needs);
    formData.append('file', this.file);
    formData.append('email', this.userData.email);

    this.ReservationService.addReservation(formData).subscribe((data: any) => {
      if (data.message == 'Reservation added') {
        // this.ReservationService.sendReservationData(formData).subscribe((data: any) => {
        //   console.log(data);

        // })
        this.addMessage = true;
        setTimeout(() => {
          this.addMessage = false;
          this.Router.navigate(['/userProfile']);
        }, 5000);
        this.SharedService.updateUserData();
        this.loading = !this.loading;
      }
    });
  }
  handelCalender() {
    let dates: any[] = [];
    if (this.reservationForm.value.hallId) {
      this.reservationForm.updateValueAndValidity();
      this.HallService.getHallReservations(
        this.reservationForm.value.hallId
      ).subscribe((data: any) => {
        this.reservations=data.reservations
        for (let i = 0; i < data.reservations.length; i++) {
          const element = data.reservations[i];
          if (
            element.encounterTime.split(' ').join('') ==
            this.encounterTime.split(' ').join('')
          ) {
            dates.push(new Date(element.date));
          }
        }
        console.log(dates);

        this.disabledDates = dates;
        this.isDateDisabled()
      });
    }
  }

  isDateDisabled() {
    // Check if the date is in the disabledDates array
    let reservations =this.reservations.filter((item:any)=>item.date == this.selectedDate)
    console.log(reservations);

    const selectedDate = new Date(this.selectedDate);


    let enabled = this.disabledDates.some(
      (disabledDate:any) => disabledDate.getTime() === selectedDate.getTime()
    );
    let enabled1 = reservations.some(
      (reservation:any) => reservation.encounterTime.split(' ').join('') == this.encounterTime.split(' ').join('')


    );
    // console.log(enabled1);

    if (enabled && enabled1) {
      this.datemessage = 'هذا التاريخ مشغول';
      // this.selectedDate = '';
    } else {
      this.datemessage = '';
    }
  }
}
