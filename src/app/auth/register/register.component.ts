import { Component, ElementRef, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/services/loader.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as intelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent<D> implements OnInit {

  iti: any;
  @ViewChild('phoneInput') phoneInput!: ElementRef;

  isSubmited = false;

  registerImage = 'assets/images/register-bg.png';
  selectedValue : any;
  reload = false;

  fileName: string = "";
  cardImageBase64: string = "";
  cardImageType : string = "";


  imageBase64: string = "";
  imageType : string = "";

  isOccupationSelected : boolean = true;
  firstPlaceHolder = "કંપની નું નામ";
  secondPlaceHolder = "હોદ્દો";
  isJob : boolean = true;
  isBusiness : boolean = false;
  isStudent : boolean = false;
  isUnemployed : boolean = false;
  isHousewife : boolean = false;
  isOther : boolean = false;
  hideFields = false;


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
    'AB- (AB negative)'
  ];
  genderList : any = [
    'Male',
    'Female',
  ]
  maritalStatus : any = [
    'Married',
    'Unmarried',
    'Divorced',
    'Single',
    'Widow'
  ]
  occupationList : any = [
    'Job',
    'Business',
    'Student', 
    'Unemployed', 
    'Housewife', 
    'Others'
  ]

  constructor(private fb: FormBuilder, 
    public router: Router, 
    private http : HttpService, 
    private sanitizer: DomSanitizer, 
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    const phoneInput = document.getElementById('phone');
    if(phoneInput){
      this.iti = intelInput(phoneInput, {
        separateDialCode : true,
        preferredCountries : ['in', 'us', 'ca'],
      })
    }
    this.sanitizer.bypassSecurityTrustResourceUrl("assets/illustators/Register.svg");
    this.RegistrationFormGroup = this.fb.group({
      firstname: ['', Validators.required],
      middlename: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      ffirstname: ['', [Validators.required]],
      fmiddlename: ['', [Validators.required]],
      flastname: ['', [Validators.required]],
      mfirstname: ['', [Validators.required]],
      mmiddlename: ['', [Validators.required]],
      mlastname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
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
      addressLineCity: ['', [Validators.required]],
      addressLinePincode: ['', [Validators.required]],
      jobBusinessType: ['Job', [Validators.required]],
      jobBusinessName: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSelectFile(event : any) {
    if (event.target.files && event.target.files[0]) {      
      this.imageType = event.target.files[0].type;
      let isValidImage = this.checkImageValidation(event.target.files[0].type);
      if(!isValidImage){
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event: any) => {
        this.imageBase64 = event.target.result;
      }
    }
  }

  checkImageValidation(fileType: any){
    if(fileType == 'image/png' || fileType == 'image/jpeg' || fileType == 'image/jpg'){
      return true;
    }
    return false;
  }

  onChangeOccupation(event : any){
    if(!!event.target.value){
      this.isOccupationSelected = true;
      if(event.target.value == this.occupationList[0]){
        this.isJob = true;
        this.isBusiness = false;
        this.isStudent = false;
        this.isUnemployed = false;
        this.isHousewife = false;
        this.isOther = false;

        this.firstPlaceHolder = "કંપની નું નામ";
        this.secondPlaceHolder = "હોદ્દો";

        this.hideFields = false;
        this.setRequired(true);
        this.setEnable(true);
      }
      else if(event.target.value == this.occupationList[1]){
        this.isJob = false;
        this.isBusiness = true;
        this.isStudent = false;
        this.isUnemployed = false;
        this.isHousewife = false;
        this.isOther = false;

        this.firstPlaceHolder = "વ્યવસાયનું નામ";
        this.secondPlaceHolder = "વ્યવસાય વિશે";

        this.hideFields = false;
        this.setRequired(true);
        this.setEnable(true);
      }
      else if(event.target.value == this.occupationList[2]){
        this.isJob = false;
        this.isBusiness = false;
        this.isStudent = true;
        this.isUnemployed = false;
        this.isHousewife = false;
        this.isOther = false;

        this.firstPlaceHolder = "શૈક્ષણિક લાયકાત";
        this.secondPlaceHolder = "શૈક્ષણિક સારાંશ";

        this.hideFields = false;
        this.setRequired(true);
        this.setEnable(true);
      }
      else if(event.target.value == this.occupationList[3]){
        this.isJob = false;
        this.isBusiness = false;
        this.isStudent = false;
        this.isUnemployed = true;
        this.isHousewife = false;
        this.isOther = false;

        this.firstPlaceHolder = "";
        this.secondPlaceHolder = "";

        this.hideFields = true;
        this.setRequired(false);
        this.setEnable(false);
      }
      else if(event.target.value == this.occupationList[4]){
        this.isJob = false;
        this.isBusiness = false;
        this.isStudent = false;
        this.isUnemployed = false;
        this.isHousewife = true;
        this.isOther = false;

        this.firstPlaceHolder = "";
        this.secondPlaceHolder = ""; 
        
        this.hideFields = true;
        this.setRequired(false);
        this.setEnable(false);
      }
      else if(event.target.value == this.occupationList[5]){
        this.isJob = false;
        this.isBusiness = false;
        this.isStudent = false;
        this.isUnemployed = false;
        this.isHousewife = false;
        this.isOther = true;

        this.firstPlaceHolder = "";
        this.secondPlaceHolder = "";

        this.hideFields = false;
        this.setRequired(false);
        this.setEnable(true);
      }
      else{
        this.isJob = true;
        this.isBusiness = false;
        this.isStudent = false;
        this.isUnemployed = false;
        this.isHousewife = false;
        this.isOther = false;

        this.firstPlaceHolder = "કંપની નું નામ";
        this.secondPlaceHolder = "હોદ્દો";

        this.hideFields = false;
        this.setRequired(true);
        this.setEnable(true);
      }
    }
  }

  setRequired(flag: any){
    if(flag == true){
      this.RegistrationFormGroup.get('jobBusinessName').setValidators([Validators.required]);
      this.RegistrationFormGroup.get('description').setValidators([Validators.required]);
    }
    else{
      this.RegistrationFormGroup.get('jobBusinessName').clearValidators();
      this.RegistrationFormGroup.get('description').clearValidators();
    }
  }

  setEnable(flag: any){
      if(flag == true){
        this.RegistrationFormGroup.get('jobBusinessName').enable();
        this.RegistrationFormGroup.get('description').enable();
      }
      else{
        this.RegistrationFormGroup.get('jobBusinessName').disable();
        this.RegistrationFormGroup.get('description').disable();
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
  
  get mfirstname() {
    return this.RegistrationFormGroup.get('mfirstname');
  }
  
  get mmiddlename() {
    return this.RegistrationFormGroup.get('mmiddlename');
  }
  
  get mlastname() {
    return this.RegistrationFormGroup.get('mlastname');
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
  
  get achivement() {
    return this.RegistrationFormGroup.get('achivement');
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

    const isValid = this.iti.isValidNumber();
    const dialCode = this.iti.getSelectedCountryData().dialCode;
    const phoneNumber = this.iti.getNumber();
    const parsedPhoneNumber = phoneNumber.slice(dialCode.length+1).trim();
    const countryName = this.iti.getSelectedCountryData().name;

    this.isSubmited = true;
    if(this.RegistrationFormGroup.invalid || !isValid){
      return;
    }
    
    let fatherName = 
      this.RegistrationFormGroup.value.flastname + " " +
      this.RegistrationFormGroup.value.ffirstname + " " +
      this.RegistrationFormGroup.value.fmiddlename;
    
    let motherName = 
      this.RegistrationFormGroup.value.mlastname + " " +
      this.RegistrationFormGroup.value.mfirstname + " " +
      this.RegistrationFormGroup.value.mmiddlename;
    
    let data = {
      "picture": this.imageBase64,
      "pictureType": this.imageType,
      "firstName" : this.RegistrationFormGroup.value.firstname,
      "middleName" : this.RegistrationFormGroup.value.middlename,
      "lastName" : this.RegistrationFormGroup.value.lastname,
      "fathersName" : fatherName,
      "mothersName" : motherName,
      "contact": parsedPhoneNumber,
      "email": this.RegistrationFormGroup.value.email,
      "password": this.RegistrationFormGroup.value.password,
      "address": this.RegistrationFormGroup.value.addressLine1,
      "city": this.RegistrationFormGroup.value.addressLineCity,
      "pinCode": this.RegistrationFormGroup.value.addressLinePincode,
      "countryCode" : dialCode,
      "country": countryName,
      "dateOfBirth" : this.RegistrationFormGroup.value.dateofbirth,
      "qualification" : this.RegistrationFormGroup.value.educational,
      "achievement" : this.RegistrationFormGroup.value.achivement,
      "bloodGroup": this.RegistrationFormGroup.value.bloodgroup,
      "gender": this.RegistrationFormGroup.value.gender,
      "gotra": this.RegistrationFormGroup.value.gotra,
      "maritalStatus": this.RegistrationFormGroup.value.maritalstatus,
      "occupationType": !!this.RegistrationFormGroup.value.jobBusinessType ? this.RegistrationFormGroup.value.jobBusinessType : "",
      "occupationName": !!this.RegistrationFormGroup.value.jobBusinessName ? this.RegistrationFormGroup.value.jobBusinessName : "",
      "occupationDescription": !!this.RegistrationFormGroup.value.description ? this.RegistrationFormGroup.value.description : "",
    }

    
    this.http.register(data).subscribe((res : any) =>{
      if(res.status == 1){
        localStorage.removeItem('userEmailId');
        this.errorMesaaage(res.message);
        this.router.navigate(['']);
        this.loader.hide();
      }
      else{
        this.errorMesaaage(res.message);
        this.loader.hide();
      }
    });
  }

  errorMesaaage(message: string) {
    Swal.fire({
      title: message,
      imageUrl: 'assets/illustators/RegisterRequestSuccess.svg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Register Request Success',
    })
  }
}
