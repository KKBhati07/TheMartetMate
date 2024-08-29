import { Routes } from '@angular/router';
import {FormContainerComponent} from "./forms-container/form-container/form-container.component";
import {LoginResolver} from "./resolver/login-resolver";

export const routes: Routes = [
  {
    path: 'auth/user_login',
    component: FormContainerComponent,
    data: { type: 'login' },
    resolve: { auth: LoginResolver }
  },
  {
    path: 'auth/user_signup',
    component: FormContainerComponent,
    data: { type: 'signup' },
    resolve: { auth: LoginResolver }
  }
];
