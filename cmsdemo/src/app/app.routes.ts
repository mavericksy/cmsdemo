//
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthedComponent } from './authed/authed.component';
import { ItemaddComponent } from './itemadd/itemadd.component';
import { AuthGuard } from './login.guard';
//
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cms', component: AuthedComponent, canActivate: [AuthGuard]},
    {path: 'add', component: ItemaddComponent, canActivate: [AuthGuard]},
];
