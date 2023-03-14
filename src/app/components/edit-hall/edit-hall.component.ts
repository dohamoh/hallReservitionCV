import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-hall',
  templateUrl: './edit-hall.component.html',
  styleUrls: ['./edit-hall.component.scss']
})
export class EditHallComponent {
  @Output() editPage:EventEmitter<any> =new EventEmitter<any>();

  closeConfirmDeletion() {
    this.editPage.emit(false);
  }
}
