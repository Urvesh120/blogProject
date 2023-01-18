import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { CountryISO, SearchCountryField } from "ngx-intl-tel-input";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.India,
  ];

  imageBase64: string = "";
  imageType : string = "";
  isJob : boolean = true;
  isOccupationSelected : boolean = false;
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
  genderList : any = [
    'Male',
    'Female',
  ]
  maritalStatus : any = [
    'Single',
    'Married',
    'Divorced',
    'Widowed',
    'Separated',
  ]
  occupationList : any = [
    'Job',
    'Bussiness'
  ]

  countryList : any = [
    {
      countryCode : "CA",
      dialCode : "+ 1",
      countryName : "Canada",
      currencyCode : "CAD"
    },
    {
      countryCode : "IN",
      dialCode : "+ 91",
      countryName : "India",
      currencyCode : "INR"
    },
    {
      countryCode : "GB",
      dialCode : "+ 44",
      countryName : "United Kingdom",
      currencyCode : "GBP"
    },
    {
      countryCode : "US",
      dialCode : "+ 1",
      countryName : "United States",
      currencyCode : "USD"
    }   
  ]

  constructor(private fb: FormBuilder, public router: Router, private http : HttpService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.RegistrationFormGroup = this.fb.group({
      firstname: ['', Validators.required],
      middlename: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      ffirstname: ['', [Validators.required]],
      fmiddlename: ['', [Validators.required]],
      flastname: ['', [Validators.required]],
      dialcode : ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      country : ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: [{ value: null, disabled: true }, [Validators.required]],
      dateofbirth : ['', [Validators.required]],
      bloodgroup: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      maritalstatus: ['', [Validators.required]],
      gotra: ['', [Validators.required]],
      educational: ['', [Validators.required]],
      achivement: [''],
      addressLine1: ['', [Validators.required]],
      addressLineLandmark: [''],
      addressLineCity: ['', [Validators.required]],
      addressLinePincode: ['', [Validators.required]],
      jobBusinessType: ['', [Validators.required]],
      jobBusinessName: ['', [Validators.required]],
      description: ['', [Validators.required]],
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

  abc(event : any){
    if(event.target.value == this.occupationList[0]){
      this.isOccupationSelected = true;
      this.isJob = true;
    }
    if(event.target.value == this.occupationList[1]){
      this.isOccupationSelected = true;
      this.isJob = false;
    }
  }
  dialCode(event : any){
    console.log(event);
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
  
  get middlename() {
    return this.RegistrationFormGroup.get('middlename');
  }

  get lastname() {
    return this.RegistrationFormGroup.get('lastname');
  }
  
  get ffirstname() {
    return this.RegistrationFormGroup.get('ffirstname');
  }
  
  get fmiddlename() {
    return this.RegistrationFormGroup.get('fmiddlename');
  }

  get flastname() {
    return this.RegistrationFormGroup.get('flastname');
  }

  get contact() {
    return this.RegistrationFormGroup.get('contact');
  }
  
  get country() {
    return this.RegistrationFormGroup.get('country');
  }

  get dialcode(){
    return this.RegistrationFormGroup.get('dialcode');
  }

  // get email() {
  //   return this.RegistrationFormGroup.get('email');
  // }
  
  get password() {
    return this.RegistrationFormGroup.get('password');
  }
  
  get confirmpassword() {
    return this.RegistrationFormGroup.get('confirmpassword');
  }

  get dateofbirth(){
    return this.RegistrationFormGroup.get('dateofbirth');
  }
  
  get bloodgroup() {
    return this.RegistrationFormGroup.get('bloodgroup');
  }
  
  get gender() {
    return this.RegistrationFormGroup.get('gender');
  }
  
  get maritalstatus() {
    return this.RegistrationFormGroup.get('maritalstatus');
  }
  
  get gotra() {
    return this.RegistrationFormGroup.get('gotra');
  }

  get educational() {
    return this.RegistrationFormGroup.get('educational');
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

  get jobBusinessType() {
    return this.RegistrationFormGroup.get('jobBusinessType');
  }
  
  get jobBusinessName() {
    return this.RegistrationFormGroup.get('jobBusinessName');
  }
  
  get description() {
    return this.RegistrationFormGroup.get('description');
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

    // let name = 
    //   this.RegistrationFormGroup.value.lastname + " " +
    //   this.RegistrationFormGroup.value.firstname + " " +
    //   this.RegistrationFormGroup.value.middlename;
    
    let fatherName = 
      this.RegistrationFormGroup.value.flastname + " " +
      this.RegistrationFormGroup.value.ffirstname + " " +
      this.RegistrationFormGroup.value.fmiddlename;
    
    let data = {
      "picture": this.imageBase64,
      "pictureType": this.imageType,
      "firstName" : this.RegistrationFormGroup.value.firstname,
      "middleName" : this.RegistrationFormGroup.value.middlename,
      "lastName" : this.RegistrationFormGroup.value.lastname,
      "fathersName" : fatherName,
      "contact": this.RegistrationFormGroup.value.contact,
      "email": this.RegistrationFormGroup.value.email,
      "password": this.RegistrationFormGroup.value.password,
      "address": address,
      "countryCode" : "",
      "country": this.RegistrationFormGroup.value.country,
      "dateOfBirth" : this.RegistrationFormGroup.value.dateofbirth,
      "qualification" : this.RegistrationFormGroup.value.educational,
      "achievement" : this.RegistrationFormGroup.value.achievement,
      "bloodGroup": this.RegistrationFormGroup.value.bloodgroup,
      "gender": this.RegistrationFormGroup.value.gender,
      "gotra": this.RegistrationFormGroup.value.gotra,
      "maritalStatus": this.RegistrationFormGroup.value.maritalstatus,
      "occupationType": this.RegistrationFormGroup.value.jobBusinessType,
      "occupationName": this.RegistrationFormGroup.value.jobBusinessName,
      "occupationDescription": this.RegistrationFormGroup.value.description,
    }
    this.http.register(data).subscribe((res : any) =>{
      if(res.status == 1){
        localStorage.removeItem('userEmailId');
        this._snackBar.open(res.message, "X",{
          duration : 5 * 1000,
          panelClass : ['success'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router.navigate(['']);
      }
      else{
        this._snackBar.open(res.message, "X",{
          duration : 5 * 1000,
          panelClass : ['error'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

}
