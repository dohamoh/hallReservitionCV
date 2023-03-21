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
  editHallForm: FormGroup = new FormGroup({
    newName: new FormControl(null, [Validators.required]),
    newDesc: new FormControl(null, [Validators.maxLength(300)]),
    attendees: new FormControl(null),
  })
  @Output() editPage: EventEmitter<any> = new EventEmitter<any>();
  @Input()hallData:any
  constructor(private hallService: HallService, private ElementRef: ElementRef, private router:Router) { }
  closeEditPage() {
    this.editPage.emit(false);
  }
  editHall(data: any) {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('newName', data.newName);
    formData.append('newDesc', data.newDesc);
    formData.append('attendees', data.attendees);

    this.hallService.editHall(formData , this.hallData._id).subscribe((Data:any) => {
      if (Data.message == 'hall Updated') {
        this.router.navigate(['/gallery'])
      }
    })
  }
  upload(event: any) {
    const file = event.target.files[0];
    this.file = file;
  }
}
