import {NgModule} from "@angular/core";
import {AppButtonComponent} from "./component/app-button/app-button.component";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {BottomSheetPillComponent} from "./component/bottomsheet-pill/bottomsheet-pill.component";

@NgModule({
  declarations: [AppButtonComponent,BottomSheetPillComponent],
  exports: [
    AppButtonComponent,
    BottomSheetPillComponent
  ],
  imports: [CommonModule, MatIcon]
})
export class AppUtilModule {}
