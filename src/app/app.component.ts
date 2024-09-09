import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "./services/auth-service";
import {HttpClientModule} from "@angular/common/http";
import {AppHeaderModule} from "./app-header/app-header.module";
import {FormsContainerModule} from "./forms-container/forms-container.module";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HttpClientModule, AppHeaderModule,
    FormsContainerModule,
  ],
  providers: [
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MatBottomSheetRef, useValue: null }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'marketmate';

  constructor(private authService:AuthService) {
  }
  ngOnInit() {
  }
}

