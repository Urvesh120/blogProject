import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LoaderService } from '../../services/loader.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: any;
  userId: any;

  constructor( private router : Router, 
    private fb: FormBuilder, 
    private http: HttpService, 
    private loader : LoaderService
    ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  redirectToRegister(){
    this.router.navigate(['auth/register']);
  }

  login(){
    this.loader.show();
    this.http.login(this.loginFormGroup.value).subscribe((res : any) => {
      if(res.status){
        localStorage.setItem('userEmailId',this.loginFormGroup.value.email);
        localStorage.setItem('token', res.jwtToken);
        localStorage.setItem('UserName', res.displayName);
        localStorage.setItem('UserId', res.userId);
        this.userId = localStorage.getItem('UserId');
        // this.http.getUserProfileById(this.userId).subscribe((res : any) => {
        //   let image = this.sanitizer.bypassSecurityTrustUrl(res.picture);
        //   localStorage.setItem('profilePic', JSON.stringify(image));
        // })
        setTimeout(
          () => {
            this.router.navigate(['']);
            this.loader.hide();
          }, 1000);
        // setTimeout(
        //   () => {
        //     this.loader.hide();
        //   }, 1500);
      }
      else{
        this.loader.hide();
      }
    });
  }

  get email(){
    return this.loginFormGroup.get('email');
  }

  get password(){
    return this.loginFormGroup.get('password');
  }
}
