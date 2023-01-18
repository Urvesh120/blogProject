import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingpageComponent } from './landingpage.component';
import { TrustsComponent } from './trusts/trusts.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthGuard } from '../services/auth.guard';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {path : '', component : LandingpageComponent,
  children : [
    {path : '', component : HomeComponent},
    {path : 'home', component : HomeComponent},
    {path : 'trusts', component : TrustsComponent},
    // {path : 'user-profile', component : UserprofileComponent,canActivate:[AuthGuard]},
    {path : 'user-profile', component : UserprofileComponent},
    {path : 'user-list', component : UserlistComponent,canActivate:[AuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class LandingpageRoutingModule { }
