import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getusers(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/users`)

  }
  getSingleuser(id): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/${id}`)

  }
  updateUser(data, id: string): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/updateUser/${id}`, data, this.httpOptions)

  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
