import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  baseUrl = environment.baseUrl;
  public userData;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(data): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/login`, data, this.httpOptions)

  }
  registerUser(data): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/register`, data, this.httpOptions)

  }

  storeUserData(data) {
    const dt = JSON.stringify(data);
    localStorage.setItem('user', dt);
  }

  onLogout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/auth/login');
  }

  getUser() {
    const data = localStorage.getItem('user');

    return JSON.parse(data);
  }
}
