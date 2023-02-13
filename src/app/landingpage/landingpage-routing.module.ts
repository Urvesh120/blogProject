// import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingpageComponent } from './landingpage.component';
import { TrustsComponent } from './trusts/trusts.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthGuard } from '../services/auth.guard';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { NandikeshwarmahadevComponent } from './trusts/nandikeshwarmahadev/nandikeshwarmahadev.component';
import { MandalComponent } from './mandal/mandal.component';
import { NonderapragatiComponent } from './mandal/nonderapragati/nonderapragati.component';
import { ProfileComponent } from './userlist/profile/profile.component';

const routes: Routes = [
  {path : '', component : LandingpageComponent,
  children : [
    {path : '', component : HomeComponent},
    {path : 'home', component : HomeComponent},
    {path : 'trusts', component : TrustsComponent},
    {path : 'mandal', component : MandalComponent},
    {path : 'nondera-pragati-mandal', component : NonderapragatiComponent},
    {path : 'nandikeshwar-mahadev-trusts', component : NandikeshwarmahadevComponent},
    {path : 'user-profile', component : UserprofileComponent,canActivate:[AuthGuard]},
    {path : 'user-list', component : UserlistComponent,canActivate:[AuthGuard]},
    {path : 'profile-preview', component : ProfileComponent,canActivate:[AuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class LandingpageRoutingModule { }
