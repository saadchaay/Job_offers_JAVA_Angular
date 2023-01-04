import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/pages/home/home.component";
import {RegisterComponent} from "./core/pages/register/register.component";
import {LoginComponent} from "./core/pages/login/login.component";
import {CompaniesComponent} from "./core/pages/companies/companies.component";
import {ProfileComponent} from "./core/pages/profile/profile.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'offers', component: HomeComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
