import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import {AuthService}
import {AuthService} from "./services/auth-service";
import {HttpClientModule} from "@angular/common/http";
import {AppHeaderModule} from "./app-header/app-header.module";
import {FormsContainerModule} from "./forms-container/forms-container.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AppHeaderModule,FormsContainerModule],
  providers:[HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'marketmate';

  constructor(private authService:AuthService) {
  }
  ngOnInit() {

    this.getAuthDetails();

  }

  getAuthDetails(){
    this.authService.loadUserDetails().subscribe(data=>{
      console.warn(data);
    })
  }
}

