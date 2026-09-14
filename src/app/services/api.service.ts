import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getServices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/services`);
  }

  submitRequest(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/requests/`, data);
  }

  getSocialFeed(): Observable<any> {
    return this.http.get(`${this.baseUrl}/social-feed`);
  }
}