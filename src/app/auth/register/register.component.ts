import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginFormGroup: any;
  email: any;
  passWord: any;
  isTokenInput = false;

  constructor(private fb: FormBuilder, public router: Router) { }

  ngOnInit(): void {
      this.loginFormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        token: ['']
      })
  }

  redirectToLogin(){
    this.router.navigate(['auth/login']);
  }

  login() {  }

}
