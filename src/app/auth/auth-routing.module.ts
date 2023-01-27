import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ModuleModule } from '../shared/modules/modules.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  // {path : 'login', component : LoginComponent, canActivate : [AuthGuard]}
  {path : '', component : LoginComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'forgot-password', component : ForgotPasswordComponent},
  {path : '**', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
