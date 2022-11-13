import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  RegistrationFormGroup: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder, public router: Router, private http : HttpService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.RegistrationFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: [{ value: null, disabled: true }, [Validators.required]],
    });
  }

  onPasswordValidation(){
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

  get firstname() {
    return this.RegistrationFormGroup.get('firstname');
  }

  get lastname() {
    return this.RegistrationFormGroup.get('lastname');
  }

  get email() {
    return this.RegistrationFormGroup.get('email');
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
      "firstName": this.RegistrationFormGroup.value.firstname,
      "lastName": this.RegistrationFormGroup.value.lastname,
      "password": this.RegistrationFormGroup.value.password,
    }
    console.groupCollapsed(data);
    this.http.register(data).subscribe((res : any) =>{
      if(res.message = "User registration requested successfully."){
        localStorage.removeItem('userEmailId');
        this._snackBar.open("Register Request sent Successfully", "close",{
          duration : 5 * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router.navigate(['/home']);
      }
    });
  }

}
