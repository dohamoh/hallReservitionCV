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
    console.log(1 % 9);
    this.SharedService.currentAllHalls.subscribe((data: any) => {
      console.log(data);
      this.allHalls = data
      this.SharedService.currentUserData.subscribe((data: any) => {
        this.userData = data;
        console.log(data);
      });
    })
  }
  //   getSrc(event: any) {
  //    this.disPlayHall = event.target.parentElement.children[0].attributes.src.nodeValue
  //  }
}
