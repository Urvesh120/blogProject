import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor( private router : Router, private util : UtilService){}

  canActivate(): boolean {
      if (this.util.isLogedIn()) {
          return true;
      }
      Swal.fire({
        title: "Invalid URL",
        imageUrl: 'assets/illustators/SomethingWentWrong.svg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Something Went Wrong',
      });
      this.router.navigate(['/home']);
      return false;
  }
}
