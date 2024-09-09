import {Routes} from '@angular/router';
import {FormContainerComponent} from "./forms-container/form-container/form-container.component";
import {URLS} from "./urls";
import {AuthGuard} from "./app-util/auth-guard";

export const routes: Routes = [
  {
    path: URLS.AUTH.LOGIN,
    component: FormContainerComponent,
    data: {type: 'login'},
    canActivate: [AuthGuard]
  },
  {
    path: URLS.AUTH.SIGNUP,
    component: FormContainerComponent,
    data: {type: 'signup'},
    canActivate: [AuthGuard]
  }
];
