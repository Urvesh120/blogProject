import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingpageRoutingModule } from './landingpage-routing.module';
import { LandingpageComponent } from './landingpage.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { TrustsComponent } from './trusts/trusts.component';

import { ModuleModule } from '../shared/modules/modules.module';


@NgModule({
  declarations: [
    LandingpageComponent,
    HomeComponent,
    TrustsComponent
  ],
  imports: [
    CommonModule,
    LandingpageRoutingModule,
    RouterModule,
    ModuleModule
  ]
})
export class LandingpageModule { }
