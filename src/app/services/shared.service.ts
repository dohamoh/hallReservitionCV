import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
Router
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userData = new BehaviorSubject<any>([]);
  currentUserData = this.userData.asObservable();
  constructor(private AuthService:AuthService,private Router:Router) { }

  updateUserData() {


    if (localStorage.getItem('userToken')) {
      this.AuthService.getUserData(localStorage.getItem('userToken')).subscribe(
        (data: any) => {

          this.userData.next(data.userData);
        },
        (err: HttpErrorResponse) => {
          if (
            err.error.message == 'jwt expired' ||
            err.error.message == 'jwt malformed'
          ) {
            localStorage.removeItem('userToken');
            this.Router.navigate([`/register`]);
          }
        }
      );
    }
  }
}
