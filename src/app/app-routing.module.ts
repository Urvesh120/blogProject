import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoustomtoastrComponent } from './coustomtoastr/coustomtoastr.component';

const routes: Routes = [
  {path : '', loadChildren: () => import('./landingpage/landingpage.module').then(m => m.LandingpageModule)},
  {path : 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path : '**',  loadChildren: () => import('./landingpage/landingpage.module').then(m => m.LandingpageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
