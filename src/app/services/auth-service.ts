import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {ApiService} from "./api-service";
import {URLS} from "../urls";
import {Login, Signup} from "../models/login-signup.model";
import {ApiHttpResponse} from "../app-util/api-response.util";
import {ApiResponse} from "../models/api-response.model";
import {CookieService} from "ngx-cookie-service";
import {User} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userDetails: User | null = null;
  private isAuthenticated: boolean = false;

  constructor(private apiService: ApiService,private cookieService: CookieService) {
  }


  loadUserDetails(): Observable<ApiHttpResponse<ApiResponse>> {
    return this.apiService.get<ApiResponse>(URLS.API.V1.AUTH.AUTH_DETAILS).pipe(
      tap(res => {
        if (res.isSuccessful()) {
          this.isAuthenticated = res.body?.data?.is_authenticated || false;
          this.userDetails = res.body?.data?.user_details;
        }
      })
    );
  }

  signupUser(body: Signup): Observable<ApiHttpResponse<ApiResponse>> {
    return this.apiService.post(URLS.API.V1.USER.CREATE, body)
  }

  loginUser(body: Login): Observable<ApiHttpResponse<ApiResponse>> {
    return this.apiService.post<ApiResponse>(URLS.API.V1.AUTH.LOGIN, body).pipe(tap(res => {
      if (res.isSuccessful()) {
        if (res.body?.data?.authenticated) {
          this.cookieService.set('sessionid',res.body.data?.sessionId,undefined,'/');
          this.userDetails = res.body?.data?.user_details;
          this.isAuthenticated = true;
        }
      }
    }))
  }

  get Authenticated(): boolean {
    return this.isAuthenticated
  }


  get UserDetails(): User | null {
    return this.userDetails;
  }


}
