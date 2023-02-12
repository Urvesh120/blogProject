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
import { EditprofileComponent } from './userprofile/editprofile/editprofile.component';
import { PaymentComponent } from './trusts/payment/payment.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NandikeshwarmahadevComponent } from './trust/nandikeshwarmahadev/nandikeshwarmahadev.component';
import { NandikeshwarcheritableComponent } from './trusts/nandikeshwarcheritable/nandikeshwarcheritable.component';
import { NonderaboardingComponent } from './trusts/nonderaboarding/nonderaboarding.component';
import { NonderapagatiComponent } from './mandal/nonderapagati/nonderapagati.component';
import { MahilaComponent } from './mandal/mahila/mahila.component';
import { MandalComponent } from './mandal/mandal.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX : true
};


@NgModule({
  declarations: [
    LandingpageComponent,
    HomeComponent,
    TrustsComponent,
    UserlistComponent,
    ProfileComponent,
    UserprofileComponent,
    EditprofileComponent,
    PaymentComponent,
    NandikeshwarmahadevComponent,
    NandikeshwarcheritableComponent,
    NonderaboardingComponent,
    NonderapagatiComponent,
    MahilaComponent,
    MandalComponent
  ],
  imports: [
    CommonModule,
    LandingpageRoutingModule,
    RouterModule,
    ModuleModule,
    PerfectScrollbarModule,
    NgbModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class LandingpageModule { }
