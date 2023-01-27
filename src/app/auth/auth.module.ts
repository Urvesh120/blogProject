import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ModuleModule } from '../shared/modules/modules.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ModuleModule,
    NgxIntlTelInputModule,
    NgbModule,
    BsDropdownModule.forRoot()
  ]
})
export class AuthModule { }
