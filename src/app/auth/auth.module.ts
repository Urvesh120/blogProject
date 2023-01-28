import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ModuleModule } from '../shared/modules/modules.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatNativeDateModule } from '@angular/material/core'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

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
    MatNativeDateModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    DatePipe,
  ]
})
export class AuthModule { }
