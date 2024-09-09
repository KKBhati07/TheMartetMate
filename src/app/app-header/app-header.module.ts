import {NgModule} from '@angular/core'
import {AppHeaderComponent} from "./component/app-header.component";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";


@NgModule({
  declarations:[AppHeaderComponent],
  imports: [
    CommonModule,
    MatIcon
  ],
  exports: [
    AppHeaderComponent
  ]
})
export class AppHeaderModule{}
