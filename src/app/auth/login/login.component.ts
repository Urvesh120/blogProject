import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: any;
  email: any;
  passWord: any;

  constructor( private router : Router, private fb: FormBuilder, private http: HttpService) { }

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
    this.http.login(this.loginFormGroup.value).subscribe((res : any) => {
      if(!!res){
        localStorage.setItem('userEmailId',this.loginFormGroup.value.email);
        localStorage.setItem('token', res.Token.token);
        this.router.navigate(['/home']);
      }
    });
  }
}
