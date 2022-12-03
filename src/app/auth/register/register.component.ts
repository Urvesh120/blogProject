import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  imageBase64: string = "";
  imageType : string = "";
  blankImage = 'assets/images/blank-profile.jpg';
  RegistrationFormGroup: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  bloodGrouptList : any = [
    'A+ (A positive)', 
    'A- (A negative)', 
    'B+ (B positive)', 
    'B- (B negative)', 
    'O+ (O positive)', 
    'O- (O negative)', 
    'AB+ (AB positive)', 
    'AB- (AB negative)'];

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

  onSelectFile(event : any) {
    if (event.target.files && event.target.files[0]) {      
      this.imageType = event.target.files[0].type;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event: any) => {
        this.imageBase64 = event.target.result;
      }
    }
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
      "picture": this.imageBase64,
      "pictureType": this.imageType,
      "firstName": this.RegistrationFormGroup.value.firstname,
      "lastName": this.RegistrationFormGroup.value.lastname,
      "email": this.RegistrationFormGroup.value.email,
      "password": this.RegistrationFormGroup.value.password,
      "address": address,
      "contact": this.RegistrationFormGroup.value.contact,
      "bloodGroup": this.RegistrationFormGroup.value.bloodgroup,
      "occupation": this.RegistrationFormGroup.value.occupationBusiness,
      "description": this.RegistrationFormGroup.value.description,
    }
    console.log(data);
    this.http.register(data).subscribe((res : any) =>{
      if(res.message = "User registration requested successfully."){
        localStorage.removeItem('userEmailId');
        this._snackBar.open("Register Request sent Successfully", "close",{
          duration : 5 * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router.navigate(['']);
      }
    });
  }

}
