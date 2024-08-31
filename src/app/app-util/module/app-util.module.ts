import {NgModule} from "@angular/core";
import {AppButtonComponent} from "./component/app-button/app-button.component";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@NgModule({
  declarations: [AppButtonComponent],
  exports: [
    AppButtonComponent
  ],
  imports: [CommonModule, MatIcon]
})
export class AppUtilModule {}
