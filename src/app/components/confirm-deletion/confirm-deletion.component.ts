import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.scss']
})
export class ConfirmDeletionComponent {
  @Output() confirmDeletion:EventEmitter<any> =new EventEmitter<any>();

  closeConfirmDeletion() {
    this.confirmDeletion.emit(false);
  }

}
