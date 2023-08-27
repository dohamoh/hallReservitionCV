import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  registerForm: FormGroup = new FormGroup({
    // managementName: new FormControl(null, [
    //   Validators.required,
    //   Validators.minLength(3),
    //   Validators.maxLength(20),
    // ]),
    gender: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    // outMinistry: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  emailErr: any;
  signEmailErr: any;
  passwordErr: any;
  SIGNUPloading: Boolean = false;
  LOGINloading: Boolean = false;
  constructor(
    private AuthService: AuthService,
    // private ElementRef: ElementRef,
    private Router: Router,
    private SharedService: SharedService
  ) {}


  signUp() {
    this.SIGNUPloading = true;
    this.AuthService.signUp(this.registerForm.value).subscribe(
      (data: any) => {
        if (data.message == 'added successfully') {
          this.SIGNUPloading = false;
          this.registerForm.reset();
          this.loginForm.reset();
        }
      },
      (err: HttpErrorResponse) => {
        this.SIGNUPloading = false;

        if (
          err.error.message == 'Invalid email' ||
          err.error.message == 'This email already register'
        ) {
          this.signEmailErr = err.error.message;
        } else {
          this.signEmailErr = '';
        }
      }
    );
  }
  login() {
    this.LOGINloading = !this.LOGINloading;

    this.AuthService.login(this.loginForm.value).subscribe(
      (data: any) => {
        if (data.token) {
          this.LOGINloading = !this.LOGINloading;
          this.registerForm.reset();
          this.loginForm.reset();
          localStorage.setItem('userToken', data.token);
          this.SharedService.isLoggedInFun();
          this.Router.navigate(['/home']);
        }
      },
      (err: HttpErrorResponse) => {
        this.LOGINloading = !this.LOGINloading;

        if (err.error.message == 'invalid password') {
          this.emailErr = '';
          this.passwordErr = 'invalid password';
        } else if (err.error.message == 'You have to register first') {
          this.passwordErr = '';
          this.emailErr = 'You have to register first';
        }
      }
    );
  }
  // @HostListener('window:click', [])
  // switch(event:any){
  //   console.log(event.target);

  // }
}
