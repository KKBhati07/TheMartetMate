import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
// import {LoginDialogService} from "../../services/login-dialog-service";
import {filter, Subject} from "rxjs";


@Component({
  selector:'mm-app-header',
  templateUrl:'./app-header.component.html',
  styleUrls:['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit{
  isAuthenticated:boolean = false;
  showSignupForm:boolean = false
  // destroy$:Subject<any>

  constructor(private router:Router) {
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd))
      .subscribe(e => {
        console.warn('Router Url::',this.router.url);
        if(!this.isAuthenticated){
          if (this.requiresAuthentication(this.router.url)) {
            // this.dialogService.showLoginDialog();
          }
        }
      });
  }


  private requiresAuthentication(url: string): boolean {
    const isSignupUrl = url.includes('/auth/signup_user')
    this.showSignupForm = isSignupUrl;
    // return url.includes('/auth/login_user') || url.includes('/protected-route') || isSignupUrl;
    return true;
  }

}
