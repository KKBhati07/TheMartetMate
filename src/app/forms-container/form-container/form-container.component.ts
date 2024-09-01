import {ChangeDetectionStrategy, Type, ChangeDetectorRef, Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceDetectorService} from "../../app-util/services/device-detector.service";
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {LoginFormComponent} from "../../login-form/component/login-form/login-form.component";
import {SignupFormComponent} from "../../login-form/component/signup-form/signup-form.component";
import {Subject, takeUntil} from "rxjs";
import {URLS} from "../../urls";

@Component({
  selector: 'mm-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent implements OnInit, OnDestroy {
  isLoginForm = true;
  slideFrom = false;
  isMobile = true;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private deviceDetector:DeviceDetectorService,
    private bottomSheet:MatBottomSheet,
    private bsr:MatBottomSheetRef
  ) {}

  ngOnInit() {
    this.setFormType();
    this.setISMobile();
    this.bsr?.afterDismissed().subscribe(action=>{
      console.log('Called!',action);
    })
  }

  private setFormType() {
    this.isLoginForm = this.route.snapshot.data['type'] === 'login';
  }

  private setISMobile() {
    this.deviceDetector.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
      if(this.isMobile){
        this.openFormInBottomSheet()
      }
      this.cdr.markForCheck();
    })
  }

  private openFormInBottomSheet() {
    const panelClass = 'login-signup-bottomsheet-container'
    const backdropClass = 'login-signup-bottomsheet-backdrop'
    const component: Type<LoginFormComponent | SignupFormComponent> =
      this.isLoginForm ? LoginFormComponent : SignupFormComponent;
    this.bottomSheet.open(component,{
      panelClass:panelClass,
      backdropClass:backdropClass,
      data:{
        openInBottomSheet:true,
      }

    }).afterDismissed().pipe(takeUntil(this.destroy$)).subscribe(action => {
      console.log('Action',action);
      if(action === 'redirect_to_signup'){
        this.router.navigate(URLS.AUTH.SIGNUP.split('/')).then(r=>null);
      }else if(!action){
        this.router.navigate([URLS.HOME]).then(r=>null);
      }
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.complete();
  }
}
