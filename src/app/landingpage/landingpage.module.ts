import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingpageRoutingModule } from './landingpage-routing.module';
import { LandingpageComponent } from './landingpage.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { TrustsComponent } from './trusts/trusts.component';
import { ModuleModule } from '../shared/modules/modules.module';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { UserlistComponent } from './userlist/userlist.component';
import { ProfileComponent } from './userlist/profile/profile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PaymentComponent } from './trusts/payment/payment.component';

import { NandikeshwarmahadevComponent } from './trusts/nandikeshwarmahadev/nandikeshwarmahadev.component';
import { MandalComponent } from './mandal/mandal.component';
import { ShreeRangVatikaComponent } from './trusts/shree-rang-vatika/shree-rang-vatika.component';
import { NonderapragatiComponent } from './mandal/nonderapragati/nonderapragati.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NearestplacesComponent } from './nearestplaces/nearestplaces.component';
import { AudiomediaComponent } from './media/audiomedia/audiomedia.component';
import { VideomediaComponent } from './media/videomedia/videomedia.component';
import { PhotomediaComponent } from './media/photomedia/photomedia.component';
import { ContactComponent } from './contact/contact.component';
import { DonationComponent } from './donation/donation.component';
import { NandikeshwarcharitableComponent } from './trusts/nandikeshwarcharitable/nandikeshwarcharitable.component';
import { MahilaComponent } from './mandal/mahila/mahila.component';
import { MandirSambandhitComponent } from './mandir-sambandhit/mandir-sambandhit.component';
import { GyatiSambandhitComponent } from './gyati-sambandhit/gyati-sambandhit.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
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


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX : true
};

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    LandingpageComponent,
    HomeComponent,
    TrustsComponent,
    UserlistComponent,
    ProfileComponent,
    UserprofileComponent,
    PaymentComponent,
    NandikeshwarmahadevComponent,
    MandalComponent,
    NonderapragatiComponent,
    NearestplacesComponent,
    AudiomediaComponent,
    VideomediaComponent,
    PhotomediaComponent,
    ContactComponent,
    DonationComponent,
    NandikeshwarcharitableComponent,
    MahilaComponent,
    MandirSambandhitComponent,
    GyatiSambandhitComponent,
    AtiRudraComponent,
    ShatChandiComponent,
    MaharudraComponent,
    SundarKandComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent,
    FourComponent,
    MahashivratriComponent,
    ShravaniparvComponent,
    ShreeRangVatikaComponent
  ],
  imports: [
    CommonModule,
    LandingpageRoutingModule,
    RouterModule,
    ModuleModule,
    PerfectScrollbarModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class LandingpageModule { }
