import {ChangeDetectionStrategy, Type, ChangeDetectorRef,Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {DeviceDetectorService} from "../../app-util/services/device-detector.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LoginFormComponent} from "../../login-form/component/login-form/login-form.component";
import {SignupFormComponent} from "../../login-form/component/signup-form/signup-form.component";

@Component({
  selector: 'mm-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent implements OnInit {
  isLoginForm = true;
  slideFrom = false;
  isMobile = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private deviceDetector:DeviceDetectorService,
    private bottomSheet:MatBottomSheet
  ) {}

  ngOnInit() {
    this.setFormType();
    this.setISMobile();
  }

  private setFormType() {
    this.isLoginForm = this.route.snapshot.data['type'] === 'login';
  }

  private setISMobile() {
    this.deviceDetector.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
      if(this.isMobile){
        console.warn('Here!!')
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
      // position:'bottom',
      data:{
        openInBottomSheet:true,
      }

    })
  }
}
