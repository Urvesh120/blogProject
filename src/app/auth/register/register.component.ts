import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  RegistrationFormGroup: any;
  email: any;
  passWord: any;
  confirmPassword: any;
  Token: any;

  constructor(private fb: FormBuilder, public router: Router, private http : HttpService) { }

  ngOnInit(): void {
    this.RegistrationFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: [{ value: null, disabled: true }, [Validators.required]],
    });
  }

  onPasswordValidation() {
    if (this.password.value.match(/\b(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}\b/)) {
      this.RegistrationFormGroup.get('confirmpassword').enable();
    }
    else {
      this.RegistrationFormGroup.get('confirmpassword').disable();
    }
  }
  onPasswordChange() {
    if (this.confirmpassword.value == this.password.value) {
      this.confirmpassword.setErrors(null);
    } else {
      this.confirmpassword.setErrors({ mismatch: true });
    }
  }

  get password() {
    return this.RegistrationFormGroup.get('password');
  }
  get confirmpassword() {
    return this.RegistrationFormGroup.get('confirmpassword');
  }

  redirectToLogin(){
    this.router.navigate(['auth/login']);
  }

  register(){
    let data = {
      "email": this.RegistrationFormGroup.value.email,
      "firstname": this.RegistrationFormGroup.value.firstname,
      "lastname": this.RegistrationFormGroup.value.lastname,
      "password": this.RegistrationFormGroup.value.password,
    }
    this.http.register(data).subscribe((res : any) =>{
      console.log(res);
    });
  }

}
