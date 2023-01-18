import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { ProfileComponent } from '../../userlist/profile/profile.component';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  imageBase64: string = "";
  imageType : string = "";
  blankImage = 'assets/images/blank-profile.jpg';

  RegistrationFormGroup: any;
  isJob : boolean = true;
  isOccupationSelected : boolean = false;

  // RegistrationFormGroup  = this.fb.group({
  //   firstname: ['', Validators.required],
  //   middlename: ['', [Validators.required]],
  //   lastname: ['', [Validators.required]],
  //   ffirstname: ['', [Validators.required]],
  //   fmiddlename: ['', [Validators.required]],
  //   flastname: ['', [Validators.required]],
  //   contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
  //   // email: ['', [Validators.required, Validators.email]],
  //   email: ['', [Validators.email]],
  //   password: ['', [Validators.required]],
  //   confirmpassword: [{ value: null, disabled: true }, [Validators.required]],
  //   bloodgroup: ['', [Validators.required]],
  //   gender: ['', [Validators.required]],
  //   maritalstatus: ['', [Validators.required]],
  //   gotra: ['', [Validators.required]],
  //   educational: ['', [Validators.required]],
  //   achivement: [''],
  //   addressLine1: ['', [Validators.required]],
  //   addressLineLandmark: [''],
  //   addressLineCity: ['', [Validators.required]],
  //   addressLinePincode: ['', [Validators.required]],
  //   jobBusinessType: ['', [Validators.required]],
  //   jobBusinessName: ['', [Validators.required]],
  //   description: ['', [Validators.required]],
  // });

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
      dialCode : "+1",
      countryName : "Canada",
      currencyCode : "CAD"
    },
    {
      countryCode : "IN",
      dialCode : "+91",
      countryName : "India",
      currencyCode : "INR"
    },
    {
      countryCode : "GB",
      dialCode : "+44",
      countryName : "United Kingdom",
      currencyCode : "GBP"
    },
    {
      countryCode : "US",
      dialCode : "+1",
      countryName : "United States",
      currencyCode : "USD"
    }   
  ]

  constructor(private fb: FormBuilder, 
    public router: Router, 
    private http : HttpService,
    private dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any) { }

  ngOnInit(): void {
    console.log("abc",this.userData);
    this.RegistrationFormGroup = this.fb.group({
      firstname: ['', Validators.required],
      middlename: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      ffirstname: ['', [Validators.required]],
      fmiddlename: ['', [Validators.required]],
      flastname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      // email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: [{ value: null, disabled: true }, [Validators.required]],
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
    this.RegistrationFormGroup.get('firstname').setValue('abc');
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

  // get email() {
  //   return this.RegistrationFormGroup.get('email');
  // }
  
  get password() {
    return this.RegistrationFormGroup.get('password');
  }
  
  get confirmpassword() {
    return this.RegistrationFormGroup.get('confirmpassword');
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

  edit(){
    this.http.register(this.RegistrationFormGroup.value).subscribe((res : any) =>{
      if(res.message = "User registration requested successfully."){
        localStorage.removeItem('userEmailId');
        this.router.navigate(['']);
      }
    });
  }

}
