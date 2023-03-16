import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hallReservation-code';
  constructor(public translate:TranslateService) {
    translate.addLangs(['ar' , 'en']);
    translate.setDefaultLang('ar');
    translate.use('ar')
  }
  switchLang(lang: string) {
    this.translate.use(lang);
 }

  ngOnInit(): void {
  }


}
