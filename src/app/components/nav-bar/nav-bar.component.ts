import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn:any;
  // userData:any
  constructor(public translate: TranslateService, private SharedService: SharedService , private router:Router) {
    translate.addLangs(['En', 'Ar']);
    translate.setDefaultLang('En');
    translate.use('En')
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  ngOnInit(): void {
//     this.SharedService.currentUserData.subscribe((data:any)=>{
// this.userData = data
//     })
    this.SharedService.isLoggedIn.subscribe((value: any) => {
      if (value == true) {
        this.isLoggedIn = true
      }else{
        this.isLoggedIn = false
      }
    })
    $(document).click(function (event :any) {
      var clickover = $(event.target);
      var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse show");
      if (_opened === true && !clickover.hasClass("navbar-toggler") && !clickover.hasClass("form-control")) {
          $("button.navbar-toggler").click();
      }
  });
  }
  logOut() {
    if (this.isLoggedIn == true) {
      localStorage.removeItem('userToken');
      this.isLoggedIn = false
      this.router.navigate(['/register'])
    }
  }
}
