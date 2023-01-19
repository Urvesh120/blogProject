import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor( private router : Router, private util : UtilService, private _snackBar: MatSnackBar){}

  canActivate(): boolean {
      if (this.util.isLogedIn()) {
          return true;
      }
      this._snackBar.open("You can not see list without login", "",{
        duration : 5 * 1000,
        panelClass : ['error'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.router.navigate(['/home']);
      return false;
  }
}
