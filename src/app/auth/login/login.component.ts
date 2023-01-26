import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LoaderService } from '../../services/loader.service';
import { UtilService } from '../../services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginImage = 'assets/illustators/Login.svg';

  //snack bar position
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  loginFormGroup: any;
  userId: any;

  constructor( private router : Router, 
    private fb: FormBuilder, 
    private http: HttpService, 
    private loader : LoaderService,
    private _snackBar: MatSnackBar,
    private util : UtilService
    ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      emailOrContact: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  redirectToRegister(){
    this.router.navigate(['auth/register']);
  }

  login(){
    this.http.login(this.loginFormGroup.value).subscribe((res : any) => {
      if(res.status == 1){
        Swal.fire({
          title: res.message,
          imageUrl: 'assets/illustators/LoginSuccess.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
        localStorage.setItem('userEmailId',this.loginFormGroup.value.emailOrContact);
        localStorage.setItem('token', res.payload.jwtToken);
        localStorage.setItem('UserName', res.payload.displayName);
        localStorage.setItem('UserId', res.payload.userId);
        this.userId = localStorage.getItem('UserId');
        this.router.navigate(['']);
      }
      else{
        Swal.fire(
          res.message,
          '',
          'error'
        )
        this.loader.hide();
      }
    });
  }

  get emailOrContact(){
    return this.loginFormGroup.get('emailOrContact');
  }

  get password(){
    return this.loginFormGroup.get('password');
  }
}
