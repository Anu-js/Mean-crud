import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import {
  loginApi_Response,
  ProfileDetailsApi_Response,
} from "../models/models";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  public userprofileDetails: ProfileDetailsApi_Response;
  constructor(private http: HttpClient, private router: Router) {}



  storeAuthToken(token) {
    localStorage.setItem("token", token);
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
