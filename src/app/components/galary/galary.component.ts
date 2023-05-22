import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-galary',
  templateUrl: './galary.component.html',
  styleUrls: ['./galary.component.scss']
})
export class GalaryComponent {
  userData: any;
  disPlayHall: any = ''
  allHalls: any[] = []
  constructor(private SharedService: SharedService) { }
  ngOnInit(): void {

    this.SharedService.currentAllHalls.subscribe((data: any) => {

      this.allHalls = data

      this.SharedService.currentUserData.subscribe((data: any) => {
        this.userData = data;
     
      });
    })
  }
}
