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
  encounterTime: any = ' 8am-12pm ';
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

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  constructor(
    private elementRef: ElementRef,
    private ReservationService: ReservationService,
    private SharedService: SharedService,
    private Router: Router,
    private HallService :HallService
  ) {
    // this.pdfMake = require('pdfmake/build/pdfmake.js');
    // this.pdfFonts = require('pdfmake/build/vfs_fonts.js');
    // this.pdfMake.vfs = this.pdfFonts.pdfMake.vfs;
  }
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
    this.reservationForm.updateValueAndValidity();
    this.HallService.getHallReservations(this.reservationForm.value.hallId).subscribe((data:any)=>{
      console.log(data);

    })
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
}
