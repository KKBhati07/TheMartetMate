import {NgModule} from "@angular/core";
import {LoginFormModule} from "../login-form/login-form.module";
import {FormContainerComponent} from "./form-container/form-container.component";
import {AppHeaderModule} from "../app-header/app-header.module";
import {NgClass} from "@angular/common";

@NgModule({
  declarations:[FormContainerComponent],
  imports: [LoginFormModule, AppHeaderModule, NgClass],
  exports:[]
})
export class FormsContainerModule{}
