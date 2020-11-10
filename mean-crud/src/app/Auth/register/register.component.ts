import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { MustMatch } from "./custom-validator/custom-validator";
import { HttpErrorResponse } from "@angular/common/http";
import { errorAlert, successAlert } from "src/app/shared/sweetalert/sweetalert";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private _auth: AuthServiceService,
    private _router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        name: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.submitted = true;
      return;
    }
    this._auth.registerUser(this.registerForm.value).subscribe(

          (res) => {
            if(res.success){
              successAlert(res.msg,'Registration')
              this._router.navigateByUrl("/login");
              this.registerForm.reset();
              this.submitted = false
            }else {
              errorAlert(res.msg,'Registration')
              this.submitted = false
            }

          },
          (error: HttpErrorResponse) => {
            errorAlert(error.error.message, error.statusText);
            this.registerForm.reset();
          }
        );

  }
}
