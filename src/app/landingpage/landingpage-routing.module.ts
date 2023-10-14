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
import { ContactComponent } from './contact/contact.component';
import { DonationComponent } from './donation/donation.component';
import { TrustsComponent } from './trusts/trusts.component';
import { MandalComponent } from './mandal/mandal.component';
import { NandikeshwarcharitableComponent } from './trusts/nandikeshwarcharitable/nandikeshwarcharitable.component';
import { MahilaComponent } from './mandal/mahila/mahila.component';
import { MandirSambandhitComponent } from './mandir-sambandhit/mandir-sambandhit.component';
import { GyatiSambandhitComponent } from './gyati-sambandhit/gyati-sambandhit.component';
import { DattYaagComponent } from './media/photomedia/datt-yaag/datt-yaag.component';
import { ShardotsavComponent } from './media/photomedia/shardotsav/shardotsav.component';
import { ShavanMassComponent } from './media/photomedia/shavan-mass/shavan-mass.component';
import { ShreeBhagvdKathaComponent } from './media/photomedia/shree-bhagvd-katha/shree-bhagvd-katha.component';
import { VishnuYaagComponent } from './media/photomedia/vishnu-yaag/vishnu-yaag.component';
import { AtiRudraComponent } from './media/photomedia/ati-rudra/ati-rudra.component';
import { ShatChandiComponent } from './media/photomedia/shat-chandi/shat-chandi.component';
import { MaharudraComponent } from './media/photomedia/maharudra/maharudra.component';
import { SundarKandComponent } from './media/photomedia/sundar-kand/sundar-kand.component';
import { OneComponent } from './media/videomedia/one/one.component';
import { TwoComponent } from './media/videomedia/two/two.component';
import { ThreeComponent } from './media/videomedia/three/three.component';
import { FourComponent } from './media/videomedia/four/four.component';
import { MahashivratriComponent } from './media/photomedia/mahashivratri/mahashivratri.component';
import { ShravaniparvComponent } from './media/photomedia/shravaniparv/shravaniparv.component';
import { ShreeRangVatikaComponent } from './trusts/shree-rang-vatika/shree-rang-vatika.component';

const routes: Routes = [
  {path : '', component : LandingpageComponent,
  children : [
    {path : '', component : HomeComponent},
    {path : 'home', component : HomeComponent},
    {path : 'mandir-sambandhit', component : MandirSambandhitComponent},
    {path : 'gyati-sambandhit', component : GyatiSambandhitComponent},
    // {path : 'trusts', component : TrustsComponent},
    // {path : 'mandal', component : MandalComponent},
    {path : 'nearest-places', component : NearestplacesComponent},
    {path : 'shree-nondera-pragati-mandal', component : NonderapragatiComponent},
    {path : 'shree-nondera-mahila-mandal', component : MahilaComponent},
    {path : 'shree-nandikeshwar-mahadev-trusts', component : NandikeshwarmahadevComponent},
    {path : 'shree-nandikeshwar-charitable-trusts', component : NandikeshwarcharitableComponent},
    {path : 'shree-rang-vatika-trusts', component : ShreeRangVatikaComponent},
    {path : 'audio', component : AudiomediaComponent},
    {path : 'video', component : VideomediaComponent},
    {path : 'photo', component : PhotomediaComponent},
    {path : 'datt-yaag', component : DattYaagComponent},
    {path : 'shardotshv', component : ShardotsavComponent},
    {path : 'shravan-maash', component : ShavanMassComponent},
    {path : 'shreemad-bhagvad-katha', component : ShreeBhagvdKathaComponent},
    {path : 'vishu-yaag', component : VishnuYaagComponent},
    {path : 'ati-rudra', component : AtiRudraComponent},
    {path : 'shat-chandi', component : ShatChandiComponent},
    {path : 'maharudra', component : MaharudraComponent},
    {path : 'sundar-kand', component : SundarKandComponent},
    {path : 'ati-rudra-shat-chandi-bhoomipoojan', component : OneComponent},
    {path : 'ati-rudra-shat-chandi', component : TwoComponent},
    {path : 'samuh-yagnopavit', component : ThreeComponent},
    {path : 'homatmak-maharudra', component : FourComponent},
    {path : 'sundar-kand', component : SundarKandComponent},
    {path : 'mahashivratri-parva', component : MahashivratriComponent},
    {path : 'shravni-parva', component : ShravaniparvComponent},
    {path : 'contact', component : ContactComponent},
    {path : 'donation', component : DonationComponent},
    // {path : 'user-profile', component : UserprofileComponent,canActivate:[AuthGuard]},
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
