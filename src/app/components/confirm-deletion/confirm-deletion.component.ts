import { Router } from '@angular/router';
import { HallService } from './../../services/hall.service';
import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.scss']
})
export class ConfirmDeletionComponent {
  @Output() confirmDeletion: EventEmitter<any> = new EventEmitter<any>();
  @Input() id:any
  loading=false
  constructor(private HallService: HallService, private Router: Router) { }
  closeConfirmDeletion() {
    this.confirmDeletion.emit(false);
  }
  delete() {


    this.loading = !this.loading
    this.HallService.deleteHall(this.id).subscribe((data: any) => {

      if (data.message == 'deleted') {
        this.loading = !this.loading
        this.Router.navigate(["/home"])
      }
    })
  }
}
