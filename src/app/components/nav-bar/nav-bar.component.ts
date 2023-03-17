import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn:any;
  constructor(public translate: TranslateService, private SharedService: SharedService , private router:Router) {
    translate.addLangs(['ar', 'en']);
    translate.setDefaultLang('ar');
    translate.use('ar')
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  ngOnInit(): void {
    this.SharedService.isLoggedIn.subscribe((value: any) => {
      if (value == true) {
        this.isLoggedIn = true
      }else{
        this.isLoggedIn = false
      }
    })
  }
  logOut() {
    if (this.isLoggedIn == true) {
      localStorage.removeItem('userToken');
      this.isLoggedIn = false
      this.router.navigate(['/register'])
    }
  }
}
