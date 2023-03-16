import { ReservationService } from './../../services/reservation.service';
import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  meeting = 'نوع اللقاء';
  file:any
  encounterTime:any
  reservationForm: FormGroup = new FormGroup({
    AdministrationName: new FormControl(null, [ Validators.required, Validators.minLength(4),]),
    members: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    encounterType: new FormControl(null, [Validators.required]),
    hallId: new FormControl(null, [Validators.required]),
    encounterTime: new FormControl(null, [Validators.required]),
    file: new FormControl(null, []),
  });
  constructor(private elementRef: ElementRef,private ReservationService:ReservationService) {}
  ngOnInit(): void {
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
time(event:any){
this.encounterTime = event.target.innerHTML

}
upload(event: any) {
  const file = event.target.files[0];
  this.file = file;


}
  // public generatePDF(): void {
  //   let pdf = '<p _ngcontent-chr-c64="" class="fs-5 fw-bold my-2">الأدارة: <span _ngcontent-chr-c64="" class="opacity-75 mx-1 fw-normal">.....</span></p><p _ngcontent-chr-c64="" class="fs-5 fw-bold my-2">عدد الاعضاء: <span _ngcontent-chr-c64="" class="opacity-75 mx-1 fw-normal">.....</span></p><p _ngcontent-chr-c64="" class="fs-5 fw-bold my-2">التاريخ: <span _ngcontent-chr-c64="" class="opacity-75 mx-1 fw-normal">.....</span></p><p _ngcontent-chr-c64="" class="fs-5 fw-bold my-2">سبب الحجز: <span _ngcontent-chr-c64="" class="opacity-75 mx-1 fw-normal">.....</span></p><p _ngcontent-chr-c64="" class="fs-5 fw-bold my-2">اسم القاعه : <span _ngcontent-chr-c64="" class="opacity-75 mx-1 fw-normal">.....</span></p><p _ngcontent-chr-c64="" class="fs-5 fw-bold my-2"> الوقت : <span _ngcontent-chr-c64="" class="opacity-75 mx-1 fw-normal">.....</span></p><p _ngcontent-chr-c64="" class="text-center fs-4">تم تقديم طلبك للادارة بتاريخ .... الساعه ..., وسوف يتم اخبارك بالرد قريبا</p>'
  //   this.invoiceElement.nativeElement.innerHTML = pdf
  //   html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas) => {
  //     const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
  //     const fileWidth = 200;
  //     const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
  //     let PDF = new jsPDF('p', 'mm', 'a4',);
  //     PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);

  //     PDF.html(this.invoiceElement.nativeElement.innerHTML)
  //     PDF.save('angular-invoice-pdf-demo.pdf');
  //     this.invoiceElement.nativeElement.innerHTML = ''

  //   });
  // }
  reservation() {
    const formData = new FormData();
    formData.append('AdministrationName', this.reservationForm.value.AdministrationName);
    formData.append('members', this.reservationForm.value.members);
    formData.append('date', this.reservationForm.value.date);
    formData.append('encounterType', this.reservationForm.value.encounterType);
    formData.append('hallId', this.reservationForm.value.hallId);
    formData.append('encounterTime', this.encounterTime);
    formData.append('file', this.file);

    this.ReservationService.addReservation(formData).subscribe((data:any)=>{
      console.log(data);

    })

  }
}
