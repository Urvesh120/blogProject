import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArrayName, FormControl } from '@angular/forms';
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
  bloodGrouptList : any = ['A+', 'A-', 'B+', 'B_', 'O+','O-', 'AB+', 'AB-'];

  constructor(private fb: FormBuilder, public router: Router, private http : HttpService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.RegistrationFormGroup = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: [{ value: null, disabled: true }, [Validators.required]],
      bloodgroup: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLineLandmark: [''],
      addressLineCity: ['', [Validators.required]],
      addressLinePincode: ['', [Validators.required]],
      occupationBusiness: ['', [Validators.required]],
      description: [''],
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

  get contact() {
    return this.RegistrationFormGroup.get('contact');
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

  get bloodgroup() {
    return this.RegistrationFormGroup.get('bloodgroup');
  }

  get addressLine1() {
    return this.RegistrationFormGroup.get('addressLine1');
  }

  get addressLineCity() {
    return this.RegistrationFormGroup.get('addressLineCity');
  }

  get addressLinePincode() {
    return this.RegistrationFormGroup.get('addressLinePincode');
  }

  get occupationBusiness() {
    return this.RegistrationFormGroup.get('occupationBusiness');
  }


  redirectToLogin(){
    this.router.navigate(['auth/login']);
  }

  register(){
    let address = 
      this.RegistrationFormGroup.value.addressLine1 + "," +
      this.RegistrationFormGroup.value.addressLineLandmark + "," +
      this.RegistrationFormGroup.value.addressLineCity + "-" +
      this.RegistrationFormGroup.value.addressLinePincode + ".";
    let data = {
      "firstName": this.RegistrationFormGroup.value.firstname,
      "lastName": this.RegistrationFormGroup.value.lastname,
      "email": this.RegistrationFormGroup.value.email,
      "password": this.RegistrationFormGroup.value.password,
      "address": address,
      "contact": this.RegistrationFormGroup.value.contact,
      "bloodgroup": this.RegistrationFormGroup.value.bloodgroup,
      "occupationBusiness": this.RegistrationFormGroup.value.occupationBusiness,
      "description": this.RegistrationFormGroup.value.description,
    }
    console.groupCollapsed(data);
    // this.http.register(data).subscribe((res : any) =>{
    //   if(res.message = "User registration requested successfully."){
    //     localStorage.removeItem('userEmailId');
    //     this._snackBar.open("Register Request sent Successfully", "close",{
    //       duration : 5 * 1000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //     this.router.navigate(['/home']);
    //   }
    // });
  }

}
