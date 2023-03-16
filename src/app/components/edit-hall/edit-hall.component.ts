import { HallService } from './../../services/hall.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-edit-hall',
  templateUrl: './edit-hall.component.html',
  styleUrls: ['./edit-hall.component.scss']
})
export class EditHallComponent {
  newPic: any = ''
  editHallForm: FormGroup = new FormGroup({
    newName: new FormControl(null, [Validators.required]),
    newDesc: new FormControl(null, [Validators.maxLength(300)]),
  })
  @Output() editPage: EventEmitter<any> = new EventEmitter<any>();
  @Input() hallData: any
  constructor(private hallService: HallService, private ElementRef: ElementRef) { }
  closeEditPage() {
    this.editPage.emit(false);
  }
  editHall(data: any) {
    const formData = new FormData();
    formData.append('newPic', this.newPic);
    formData.append('newName', data.newName);
    formData.append('newDesc', data.newDesc);
  }
}
