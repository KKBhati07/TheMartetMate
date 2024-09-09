import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {filter, Subject} from "rxjs";
import {AuthService} from "../../services/auth-service";
import {User} from "../../models/user.model";
import {Redirect} from "../../models/login-signup.model";
import {URLS} from "../../urls";
import {CONSTANTS} from "../../app.constants";


@Component({
  selector:'mm-app-header',
  templateUrl:'./app-header.component.html',
  styleUrls:['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent implements OnInit{

  protected readonly CONSTANTS = CONSTANTS;
  isLoading = true;
  isAuthenticated:boolean = false;
  user:User | null = null;
  renderIcon = false;
  isRootPage = false;
  constructor(private router:Router,
              private authService:AuthService,
              private cdr: ChangeDetectorRef,
              ) {}

  ngOnInit() {
    this.checkForAuthenticationAndSetUser();
    this.checkForRootPage();
  }

  private checkForAuthenticationAndSetUser() {
    if(this.authService.Authenticated){
      this.isAuthenticated = true;
      this.user = this.authService.UserDetails
      if(!this.user?.profileUrl) this.renderIcon = true;
    }

    this.isLoading = false;
    this.cdr.markForCheck();
  }

  onNavigationClick(redirectTo:Redirect){
    if(!redirectTo) return;
    if(redirectTo === 'login'){
      this.router.navigate(URLS.AUTH.LOGIN.split('/')).then(r=>null)
    }else if(redirectTo === 'signup'){
      this.router.navigate(URLS.AUTH.SIGNUP.split('/')).then(r=>null)
    }
  }


  private checkForRootPage() {
    this.router.events.pipe(filter(e=> e instanceof NavigationEnd)).subscribe(e=>{
      this.isRootPage = e.url === URLS.ROOT;
      this.cdr.markForCheck();
    })
  }
}
