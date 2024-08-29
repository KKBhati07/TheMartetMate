import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

private getAuthHeaders():HttpHeaders{
    let headers=new HttpHeaders();
    const cookie = this.cookieService.get('sessionid');
    if(cookie) {
      headers= headers.set('sessionid', cookie);
    }
    return headers;
  }

  get<T>(endpoint: string): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, { headers });
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, { headers });
  }

  delete<T>(endpoint: string): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { headers });
  }
}
