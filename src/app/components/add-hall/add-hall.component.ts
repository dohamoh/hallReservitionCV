import { HallService } from './../../services/hall.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-hall',
  templateUrl: './add-hall.component.html',
  styleUrls: ['./add-hall.component.scss']
})
export class AddHallComponent {
  file:any = '';
  loading=false
  addHallForm: FormGroup = new FormGroup({
    hallName: new FormControl(null, [Validators.required]),
    hallDesc: new FormControl(null, [Validators.required]),
    hallAttendees: new FormControl(null, [Validators.required])
  });
  constructor(private router:Router , private hallService:HallService){}
  addHall(data: any) {
    this.loading = true
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('hallName', data.hallName);
    formData.append('hallDesc', data.hallDesc);
    formData.append('hallAttendees', data.hallAttendees);

    this.hallService.addHall(formData).subscribe((Data:any) => {
      if (Data.message == 'hall added') {
        this.loading = false
        this.router.navigate(['/home'])
      }
    })
  }
  closeAddPage() {
    this.router.navigate(['/gallery'])
  }

  upload(event: any) {
    const file = event.target.files[0];
    this.file = file;
  }
}
