import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { errorAlert, successAlert } from '../../shared/sweetalert/sweetalert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;

  loginForm: FormGroup;

  constructor(
    private _auth: AuthServiceService,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onRegister() {
    this._router.navigateByUrl('/auth/register');
  }
  onLoginSubmit() {
    if (!this.loginForm.valid) {
      this.submitted = true;
      return;
    }
    this._auth.loginUser(this.loginForm.value).subscribe(
      (res) => {
        if (res.success) {
          successAlert(res.msg, 'Login');
          this._auth.storeUserData(res.user);
          this._router.navigateByUrl('/dashboard/user');
          this.loginForm.reset();
          this.submitted = false;
        } else {
          errorAlert(res.msg, 'Login');
          this.submitted = false;
        }
      },
      (error: HttpErrorResponse) => {
        errorAlert(error.error.message, error.statusText);
        this.loginForm.reset();
      }
    );

  }
}
