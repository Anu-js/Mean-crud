import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";
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
public userData
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  public userprofileDetails: ProfileDetailsApi_Response;
  constructor(private http: HttpClient, private router: Router) {}

  loginUser(data): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/login`, data, this.httpOptions)
      .pipe(

        map((res: Response) => res));
  }
  registerUser(data): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/register`, data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }


  storeUserData(data) {
    const dt = JSON.stringify(data)
    localStorage.setItem("user", dt);
  }

  onLogout() {
    localStorage.removeItem("user");
    this.router.navigateByUrl("/auth/login");
  }

  getToken() {
    const data  = localStorage.getItem("user");

    return JSON.parse(data)
  }
}
