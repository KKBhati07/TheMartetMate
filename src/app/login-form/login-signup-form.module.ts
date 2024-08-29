import {NgModule} from "@angular/core";
import {LoginFormComponent} from "./component/login-form/login-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {FormContainerComponent} from "../forms-container/form-container/form-container.component";
import {MatIconModule} from "@angular/material/icon";
import {SignupFormComponent} from "./component/signup-form/signup-form.component";

export function getLoginContainer() {
  return FormContainerComponent;
}


@NgModule({
  declarations:[LoginFormComponent, SignupFormComponent],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatIconModule
  ],
  exports: [LoginFormComponent, SignupFormComponent]
})
export class LoginSignupFormModule {
}
