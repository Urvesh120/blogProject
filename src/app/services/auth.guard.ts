import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAuthenticated : any;

  constructor( private authService : AuthService, private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      this.isAuthenticated = this.authService.isAuthenticated();
      if (this.isAuthenticated) {
          return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
