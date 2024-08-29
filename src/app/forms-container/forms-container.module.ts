import {NgModule} from "@angular/core";
import {LoginSignupFormModule} from "../login-form/login-signup-form.module";
import {FormContainerComponent} from "./form-container/form-container.component";
import {AppHeaderModule} from "../app-header/app-header.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations:[FormContainerComponent],
  imports: [LoginSignupFormModule, AppHeaderModule, CommonModule],
  exports:[]
})
export class FormsContainerModule{}
