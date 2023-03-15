import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  registerForm: FormGroup = new FormGroup({
    managementName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    gender: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    outMinistry: new FormControl(null),
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
  passwordErr: any;
  constructor(
    private AuthService: AuthService,
    private ElementRef: ElementRef,
    private Router:Router
  ) {}
  ifChecked() {
    if (this.ElementRef.nativeElement.querySelector('#exampleCheck').checked) {
      this.registerForm.removeControl('managementName');
      this.ElementRef.nativeElement.querySelector(
        '#managementName'
      ).style.display = 'none';
    } else {
      this.registerForm.addControl(
        'managementName',
        new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ])
      );
      this.ElementRef.nativeElement.querySelector(
        '#managementName'
      ).style.display = 'flex';
    }
  }
  signUp() {
    this.AuthService.signUp(this.registerForm.value).subscribe((data: any) => {
      console.log(data);
    });
  }
  login() {
    console.log(this.loginForm.value);

    this.AuthService.login(this.loginForm.value).subscribe(
      (data: any) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem('userToken', data.token);
this.Router.navigate(['/home'])
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error.message == 'in valid password') {
          this.emailErr = '';
          this.passwordErr = 'in valid password';
        } else if (err.error.message == 'You have to register first') {
          this.passwordErr = '';
          this.emailErr = 'You have to register first';
        }
      }
    );
  }
}
