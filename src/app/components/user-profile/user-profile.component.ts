import { SharedService } from './../../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  width: any;
  right: any;
  userData:any
  @ViewChild('sideNav') sideNav: any;
  userData1={
    role:'admin'
  }
constructor(private SharedService:SharedService){}
  ngOnInit(): void {

    // this.SharedService.currentUserData.subscribe((data: any) => {
    //   this.userData = data;
    // });
    if (window.innerWidth <= 375) {
      this.width = '55%';
      this.right = '-55%';
    } else if (window.innerWidth > 375 && window.innerWidth <= 768) {
      this.width = '57%';
      this.right = '-52%';
    } else {
      this.width = '57%';
      this.right = '-50%';
    }
  }
  open() {
    if (this.sideNav.nativeElement.style.right == '0%') {
      this.sideNav.nativeElement.style.right = `${this.right}`;
    } else {
      this.sideNav.nativeElement.style.right = '0%';
    }
  }
}
