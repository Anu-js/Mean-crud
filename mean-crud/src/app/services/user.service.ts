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
export class UserService {
  baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  public userprofileDetails: ProfileDetailsApi_Response;
  constructor(private http: HttpClient) {}

  getusers(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/users`)
      .pipe(map((res: Response) => res));
  }
  getSingleuser(id): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/${id}`)
      .pipe(map((res: Response) => res));
  }
  updateUser(data, id:string): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/updateUser/${id}`, data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }
  deleteUser( id:string): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/${id}`)

  }


}
