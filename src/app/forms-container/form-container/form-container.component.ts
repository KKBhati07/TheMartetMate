import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";

@Component({
  selector:'mm-orm-container',
  templateUrl:'./form-container.component.html',
  styleUrls:['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent implements OnInit {
  isLoginForm = true;
  slideFrom = false;
  constructor(private cdr: ChangeDetectorRef) {
  }
  ngOnInit() {
    // this.slideFrom = true;
    setTimeout(()=>{
      this.slideFrom= true;
      this.cdr.markForCheck();
    },300)
  }

}
