import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ModuleModule } from '../shared/modules/modules.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatNativeDateModule } from '@angular/material/core'; 
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
    MatNativeDateModule
  ],
  providers: [
    DatePipe,
  ]
})
export class AuthModule { }
