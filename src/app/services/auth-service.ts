import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiService} from "./api-service";
import {URLS} from "../urls";


@Injectable({
  providedIn:'root'
})
export class AuthService{

  private userDetails: any;
  private isAuthenticated:boolean=false;

  constructor(private apiService:ApiService) {}


  loadUserDetails(): Observable<any> {
    return this.apiService.get(URLS.AUTH.AUTH_DETAILS)
  }

  get Authenticated(){
    return this.isAuthenticated
  }


  getUserDetails(): any {
    return this.userDetails;
  }



}
