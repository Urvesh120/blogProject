import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingpageComponent } from './landingpage.component';
import { TrustsComponent } from './trusts/trusts.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthGuard } from '../services/auth.guard';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { NonderaboardingComponent } from './trusts/nonderaboarding/nonderaboarding.component';
import { NandikeshwarmahadevComponent } from './trusts/nandikeshwarmahadev/nandikeshwarmahadev.component';
import { NandikeshwarcheritableComponent } from './trusts/nandikeshwarcheritable/nandikeshwarcheritable.component';
import { MandalComponent } from './mandal/mandal.component';
import { NonderapagatiComponent } from './mandal/nonderapagati/nonderapagati.component';
import { MahilaComponent } from './mandal/mahila/mahila.component';

const routes: Routes = [
  {path : '', component : LandingpageComponent,
  children : [
    {path : '', component : HomeComponent},
    {path : 'home', component : HomeComponent},
    
    {path : 'trusts', component : TrustsComponent},
    {path : 'shree-nondera-boarding-trust', component : NonderaboardingComponent},
    {path : 'shree-nandikeshwar-mahadev-trust', component : NandikeshwarmahadevComponent},
    {path : 'shree-nandikeshwar-cheritable-trust', component : NandikeshwarcheritableComponent},
    
    {path : 'mandal', component : MandalComponent},
    {path : 'nendera-pagati-mandal', component : NonderapagatiComponent},
    {path : 'mahila-mandal', component : MahilaComponent},
    
    {path : 'user-profile', component : UserprofileComponent,canActivate:[AuthGuard]},
    {path : 'user-list', component : UserlistComponent,canActivate:[AuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class LandingpageRoutingModule { }
