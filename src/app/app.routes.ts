import { Routes } from '@angular/router';
import {FormContainerComponent} from "./forms-container/form-container/form-container.component";
import {LoginResolver} from "./resolver/login-resolver";
import {URLS} from "./urls";

export const routes: Routes = [
  {
    path: URLS.AUTH.LOGIN,
    component: FormContainerComponent,
    data: { type: 'login' },
    resolve: { auth: LoginResolver },
  },
  {
    path: URLS.AUTH.SIGNUP,
    component: FormContainerComponent,
    data: { type: 'signup' },
    resolve: { auth: LoginResolver }
  }
];
