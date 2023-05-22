import { Router } from '@angular/router';
import { HallService } from './../../services/hall.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-edit-hall',
  templateUrl: './edit-hall.component.html',
  styleUrls: ['./edit-hall.component.scss']
})
export class EditHallComponent {
  file: any = ''
  loading=false
  editHallForm: FormGroup = new FormGroup({
    newName: new FormControl(null, [Validators.required]),
    newDesc: new FormControl(null, [Validators.maxLength(300)]),
    newAttendees: new FormControl(null , []),
  })
  @Output() editPage: EventEmitter<any> = new EventEmitter<any>();
  @Input() id: any

  constructor(private hallService: HallService, private ElementRef: ElementRef, private router: Router) { }
  closeEditPage() {
    this.editPage.emit(false);
  }
  editHall(data: any) {

    this.loading = !this.loading
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('newName', data.newName);
    formData.append('newDesc', data.newDesc);
    formData.append('attendees', data.newAttendees);



    this.hallService.editHall(formData, this.id).subscribe((Data: any) => {

      if (Data.message == 'Updated') {
        this.loading = !this.loading
        this.router.navigate(['/home'])
      }
    })
  }
  upload(event: any) {
    const file = event.target.files[0];
    this.file = file;


  }
}
