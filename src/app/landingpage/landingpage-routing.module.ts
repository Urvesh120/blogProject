// import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingpageComponent } from './landingpage.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthGuard } from '../services/auth.guard';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { NandikeshwarmahadevComponent } from './trusts/nandikeshwarmahadev/nandikeshwarmahadev.component';
import { NonderapragatiComponent } from './mandal/nonderapragati/nonderapragati.component';
import { ProfileComponent } from './userlist/profile/profile.component';
import { NearestplacesComponent } from './nearestplaces/nearestplaces.component';
import { AudiomediaComponent } from './media/audiomedia/audiomedia.component';
import { VideomediaComponent } from './media/videomedia/videomedia.component';
import { PhotomediaComponent } from './media/photomedia/photomedia.component';
import { PhotomediaOneComponent } from './media/photomedia/photomedia-one/photomedia-one.component';
import { PhotomediaTwoComponent } from './media/photomedia/photomedia-two/photomedia-two.component';
import { PhotomediaThreeComponent } from './media/photomedia/photomedia-three/photomedia-three.component';
import { ContactComponent } from './contact/contact.component';
import { DonationComponent } from './donation/donation.component';
import { TrustsComponent } from './trusts/trusts.component';
import { MandalComponent } from './mandal/mandal.component';
import { NandikeshwarcharitableComponent } from './trusts/nandikeshwarcharitable/nandikeshwarcharitable.component';
import { MahilaComponent } from './mandal/mahila/mahila.component';

const routes: Routes = [
  {path : '', component : LandingpageComponent,
  children : [
    {path : '', component : HomeComponent},
    {path : 'home', component : HomeComponent},
    // {path : 'trusts', component : TrustsComponent},
    // {path : 'mandal', component : MandalComponent},
    {path : 'nearest-places', component : NearestplacesComponent},
    {path : 'shree-nondera-pragati-mandal', component : NonderapragatiComponent},
    {path : 'shree-nondera-mahila-mandal', component : MahilaComponent},
    {path : 'shree-nandikeshwar-mahadev-trusts', component : NandikeshwarmahadevComponent},
    {path : 'shree-nandikeshwar-charitable-trusts', component : NandikeshwarcharitableComponent},
    {path : 'audio', component : AudiomediaComponent},
    {path : 'video', component : VideomediaComponent},
    {path : 'photo', component : PhotomediaComponent},
    {path : 'photo-one', component : PhotomediaOneComponent},
    {path : 'photo-two', component : PhotomediaTwoComponent},
    {path : 'photo-three', component : PhotomediaThreeComponent},
    {path : 'contact', component : ContactComponent},
    {path : 'donation', component : DonationComponent},
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
