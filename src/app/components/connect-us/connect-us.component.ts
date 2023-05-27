import { Component } from '@angular/core';

@Component({
  selector: 'app-connect-us',
  templateUrl: './connect-us.component.html',
  styleUrls: ['./connect-us.component.scss'],
})
export class ConnectUsComponent {
  open(data: any) {
    let replace = data.classList.replace('openData', 'closeData');
    if (!replace) {
      data.style.width = 'auto';
      setTimeout(() => {
        let replace = data.classList.replace('closeData', 'openData');
      }, 1);
    } else {
      setTimeout(() => {
        data.style.width = '0px';
      }, 600);
    }
  }
}
