import { Router } from '@angular/router';
import { HallService } from './../../services/hall.service';
import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.scss']
})
export class ConfirmDeletionComponent {
  @Output() confirmDeletion: EventEmitter<any> = new EventEmitter<any>();
  constructor(private HallService: HallService, private Router: Router) { }
  closeConfirmDeletion() {
    this.confirmDeletion.emit(false);
  }
  delete() {
    this.HallService.deleteHall('id').subscribe((data: any) => {
      console.log(data);
      if (data.message == 'deleted') {
        this.Router.navigate(["/gallery"])
      }
    })
  }
}
