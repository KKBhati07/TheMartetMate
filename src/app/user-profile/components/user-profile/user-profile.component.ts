import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {DeviceDetectorService} from "../../../app-util/services/device-detector.service";
import {UserService} from "../../../services/user.service";
import {ProfileDetails} from "../../../models/user.model";

@Component({
  selector: "mm-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  renderComponent = false;
  isMobile = false;
  userDetails:ProfileDetails | null = null;
  constructor(
    private router:Router,
    private deviceDetector: DeviceDetectorService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    ) {
  }
  ngOnInit() {
    this.setIsMobile();
    this.getUserDetails();
  }
  setIsMobile() {
    this.deviceDetector.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
      this.cdr.markForCheck();
      console.warn(this.isMobile)
    })
  }

  getUserDetails() {
    const uuid = this.router.url.split('/')[2];
    console.warn(uuid)
    this.userService.getDetails(uuid).subscribe(res => {
      if(res.isSuccessful()){
        this.userDetails = res.body?.data?.user_details;
        if(this.userDetails) this.userDetails.self = res.body?.data?.self
        console.warn(res.body?.data?.user_details)
        this.renderComponent = true;
        this.cdr.markForCheck();
      }
    })
  }
}
