import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../services/auth-service";
import {User} from "../../models/user.model";
import {Redirect} from "../../models/login-signup.model";
import {URLS} from "../../urls";
import {CONSTANTS} from "../../app.constants";
import {DeviceDetectorService} from "../../app-util/services/device-detector.service";
import {CategoryService} from "../../services/category.service";


@Component({
  selector:'mm-app-header',
  templateUrl:'./app-header.component.html',
  styleUrls:['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent implements OnInit{
  categories:string[]=[]
  protected readonly CONSTANTS = CONSTANTS;
  isMobile = false;

  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  isLoading$ = new BehaviorSubject<boolean>(true);
  user:User | null = null;
  renderIcon = false;
  expandProfile = false;
  expandedCategories = false;
  renderExpandedContent = false
  constructor(private router:Router,
              private authService:AuthService,
              private cdr: ChangeDetectorRef,
              private deviceDetector:DeviceDetectorService,
              private categoryService:CategoryService
              ) {}

  ngOnInit() {
    this.checkForAuthenticationAndSetUser();
    this.setIsMobile()
  }

  onLogOutClick(){
    this.authService.logoutUser().subscribe(res=>{
      if(res.isSuccessful()){
        console.warn(res.body)
        if(res.body?.data?.status === 200){
          this.router.navigate([URLS.ROOT]).then(r=>{
            window.location.reload();
          });
        }else{
          //TODO:: Notification Service for failed logout!
        }
      }
    })
  }

  onCategoryAndHomeClick(category:any=''){
    const queryParams = category? {queryParams:{category}} : {}
    this.router.navigate([URLS.HOME],queryParams).then(r=>{
      this.expandProfile = false;
      this.expandedCategories = false;
      this.renderExpandedContent = false
      this.cdr.markForCheck();
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(res=>{
      if(res.isSuccessful()){
        this.categories = res.body?.data?.categories ?? [];
        this.cdr.markForCheck();
      }
    })
  }

  private checkForAuthenticationAndSetUser() {
    if(this.authService.Authenticated){
      this.isAuthenticated$.next(true);
      this.user = this.authService.UserDetails
      if(!this.user?.profileUrl) this.renderIcon = true;
    }
    this.isLoading$.next(false);
    setTimeout(()=>{
      this.cdr.detectChanges();

    },0);
    this.cdr.detectChanges();
  }

  onNavigationClick(redirectTo:Redirect){
    if(!redirectTo) return;
    if(redirectTo === 'login'){
      this.router.navigate(URLS.AUTH.LOGIN.split('/'),{queryParams:{redirect:this.router.url}}).then(r=>null)
    }else if(redirectTo === 'signup'){
      this.router.navigate(URLS.AUTH.SIGNUP.split('/')).then(r=>null)
    }
  }

  onProfileClick(){
    if(this.expandProfile){
      this.expandProfile = !this.expandProfile;
      this.renderExpandedContent = false;
    }else{
      this.expandedCategories =false;
      this.expandProfile = !this.expandProfile;
    }

    this.cdr.markForCheck();
  }
  onCategoriesClick(){
    if(this.expandedCategories){
      this.expandedCategories = !this.expandedCategories;
    }else{
      this.expandProfile = false;
      this.expandedCategories = true;
      this.getCategories();
    }
    this.cdr.markForCheck();
  }

  private setIsMobile() {
    this.deviceDetector.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
      this.cdr.markForCheck();
    });
  }
}
