import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class LoginResolver implements Resolve<boolean>{
  constructor(private authService:AuthService,
              private router:Router) {
    console.warn('Resolver Called!')
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.Authenticated){
      // this.router.navigate(['/']);
      return false;
    }else{
      return true;
    }

  }
}
