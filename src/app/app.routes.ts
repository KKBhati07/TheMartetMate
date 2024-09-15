import {Routes} from '@angular/router';
import {FormContainerComponent} from "./forms-container/form-container/form-container.component";
import {URLS} from "./urls";
import {AuthGuard} from "./app-util/auth-guard";
import {AppRootComponent} from "./app-root/components/app-root.component";
import {HomeComponent} from "./app-root/components/home-component/home.component";

export const routes: Routes = [
  { path: URLS.ROOT, component: AppRootComponent },
  { path: URLS.HOME, component: HomeComponent },
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
