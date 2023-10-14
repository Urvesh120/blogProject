import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import * as intelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  iti: any;
  @ViewChild('phoneInput') phoneInput!: ElementRef;

  isSubmited = false;

  userData : any = {};
  bindUserData: any = {};
  haveEmail = false;
  isImage = false;
  isDescription = false;
  image : any;
  disabled = true;
  showContent = false;
  address = "";
  RegistrationFormGroup: any;
  imageBase64: string = "";
  imageType : string = "";
  blankImage = 'assets/images/blank-profile.jpg';



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

  constructor(private http : HttpService,
    private sanitizer: DomSanitizer,
    private loader : LoaderService,
    private fb: FormBuilder
    ) { }

  async ngOnInit(): Promise<void> {
    this.loadForm();
    await this.loadData();
    // this.bindFormData();   
  }

  async loadData(){
    const phoneInput = document.getElementById('phone');
    if(phoneInput){
      this.iti = intelInput(phoneInput, {
        separateDialCode : true,
        preferredCountries : ['in', 'us', 'ca'],
      })
    }
    await this.http.getUserProfileById(localStorage.getItem('UserId')).subscribe((res : any) => {
      if(res.status == 1){
        this.address = "";
        this.userData = res.payload;
        this.bindUserData = res.payload;
        this.bindFormData();
        let profile = this.userData.picture.split(",");
        if(!!profile[1]){
          this.isImage = true;
          this.image = this.sanitizer.bypassSecurityTrustUrl(this.userData.picture);
          this.imageBase64 = profile[1];
          this.imageType = this.userData.pictureType;
        }
        else{
          this.image = this.blankImage;
        }
        if(this.userData.occupationType == this.occupationList[0]){
          this.isJob = true;
        }
        if(this.userData.occupationType == this.occupationList[1]){
          this.isJob = false;
        }
        if(!!this.userData.description){
          this.isDescription = true;
        }
        if(!!this.userData.email){
          this.haveEmail = true;
        }

        if(!!this.userData.address){
          this.address = this.address + this.userData.address + ","
        }

        if(!!this.userData.city){
          this.address = this.address + this.userData.city + "-"
        }

        if(!!this.userData.address){
          this.address = this.userData.address + "."
        }

        this.loader.hide();
        this.showContent = true;
      }
      else{
        Swal.fire({
          title: res.message,
          imageUrl: 'assets/illustators/SomethingWentWrong.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Something Went Wrong',
        })
        this.loader.hide();
      }
    }); 
  }

  onSelectFile(event : any) {
    if (event.target.files && event.target.files[0]) {
      this.imageType = event.target.files[0].type;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageBase64 = event.target.result;
        this.image = this.imageBase64;
      }
    }
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

  enableForm(){
    this.RegistrationFormGroup.get('firstname').enable();
    this.RegistrationFormGroup.get('middlename').enable();
    this.RegistrationFormGroup.get('lastname').enable();
    this.RegistrationFormGroup.get('ffirstname').enable();
    this.RegistrationFormGroup.get('mothername').enable();
    this.RegistrationFormGroup.get('contact').enable();
    this.RegistrationFormGroup.get('dateofbirth').enable();
    this.RegistrationFormGroup.get('maritalstatus').enable();
    this.RegistrationFormGroup.get('educational').enable();
    this.RegistrationFormGroup.get('achivement').enable();
    this.RegistrationFormGroup.get('addressLine1').enable();
    this.RegistrationFormGroup.get('addressLineCity').enable();
    this.RegistrationFormGroup.get('addressLinePincode').enable();
    this.RegistrationFormGroup.get('jobBusinessType').enable();
    this.RegistrationFormGroup.get('jobBusinessName').enable();
    this.RegistrationFormGroup.get('description').enable();
    this.disabled = false;
  }

  edit(){
    const isValid = this.iti.isValidNumber();
    const dialCode = this.iti.getSelectedCountryData().dialCode;
    const phoneNumber = this.iti.getNumber();
    const parsedPhoneNumber = phoneNumber.slice(dialCode.length+1).trim();
    const countryName = this.iti.getSelectedCountryData().name;

    if(this.RegistrationFormGroup.invalid || !isValid){
      return;
    }

    let data = {
      "achievement": this.RegistrationFormGroup.value.achivement,
      "address": this.RegistrationFormGroup.value.addressLine1,
      "bloodGroup": this.userData.bloodGroup,
      "city": this.RegistrationFormGroup.value.addressLineCity,
      "contact": parsedPhoneNumber,
      "country": countryName,
      "countryCode": dialCode,
      "dateOfBirth": this.userData.dateOfBirth,
      "email": this.RegistrationFormGroup.value.email,
      "fathersName": this.userData.fathersName,
      "firstName": this.RegistrationFormGroup.value.firstname,
      "gender": this.userData.gender,
      "gotra": this.userData.gotra,
      "id": this.userData.id,
      "landmark": this.RegistrationFormGroup.value.addressLineLandmark,
      "lastName": this.RegistrationFormGroup.value.lastname,
      "maritalStatus": this.RegistrationFormGroup.value.maritalstatus,
      "middleName": this.RegistrationFormGroup.value.middlename,
      "mothersName": this.userData.mothersName,
      "occupationDescription": !!this.RegistrationFormGroup.value.description ? this.RegistrationFormGroup.value.description : "",
      "occupationName": !!this.RegistrationFormGroup.value.jobBusinessName ? this.RegistrationFormGroup.value.jobBusinessName : "",
      "occupationType": !!this.RegistrationFormGroup.value.jobBusinessType ? this.RegistrationFormGroup.value.jobBusinessType : "",
      "picture": this.imageBase64,
      "pictureType": this.imageType,
      "pinCode": this.RegistrationFormGroup.value.addressLinePincode,
      "qualification": this.RegistrationFormGroup.value.educational
    }

    // let data = {
    //   "fathersName" : fatherName,
    //   "mothersName" : motherName,
    //   "dateOfBirth" : this.RegistrationFormGroup.value.dateofbirth,
    //   "bloodGroup": this.RegistrationFormGroup.value.bloodgroup,
    //   "gender": this.RegistrationFormGroup.value.gender,
    //   "gotra": this.RegistrationFormGroup.value.gotra,
    // }

    this.http.updateprofile(data).subscribe((res : any) =>{
      if(res.status == 1){
        this.disabled = true;
        Swal.fire({
          title: res.message,
          imageUrl: 'assets/illustators/RegisterRequestSuccess.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Profile Update Success',
        }).then(function(){
          window.location.reload();
        })
        this.loader.hide();
      }
      else{
        Swal.fire({
          title: res.message,
          imageUrl: 'assets/illustators/SomethingWentWrong.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Something Went Wrong',
        })
        this.loader.hide();
      }
    });
  }

  close(){
    this.disabled = true;
    this.RegistrationFormGroup.disable();
  }

  loadForm(){
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

  bindFormData(){
    this.RegistrationFormGroup.get('firstname').patchValue(this.bindUserData.firstName);
    this.RegistrationFormGroup.get('middlename').patchValue(this.bindUserData.middleName);
    this.RegistrationFormGroup.get('lastname').patchValue(this.bindUserData.lastName);
    this.RegistrationFormGroup.get('ffirstname').patchValue(this.bindUserData.fathersName);
    this.RegistrationFormGroup.get('fmiddlename').patchValue(this.bindUserData.fathersName);
    this.RegistrationFormGroup.get('flastname').patchValue(this.bindUserData.fathersName);
    this.RegistrationFormGroup.get('mfirstname').patchValue(this.bindUserData.mothersName);
    this.RegistrationFormGroup.get('mmiddlename').patchValue(this.bindUserData.mothersName);
    this.RegistrationFormGroup.get('mlastname').patchValue(this.bindUserData.mothersName);
    this.RegistrationFormGroup.get('email').patchValue(this.bindUserData.email);
    this.RegistrationFormGroup.get('dateofbirth').patchValue(this.bindUserData.dateOfBirth);
    this.RegistrationFormGroup.get('bloodgroup').patchValue(this.bindUserData.bloodGroup);
    this.RegistrationFormGroup.get('gender').patchValue(this.bindUserData.gender);
    this.RegistrationFormGroup.get('maritalstatus').patchValue(this.bindUserData.maritalStatus);
    this.RegistrationFormGroup.get('gotra').patchValue(this.bindUserData.gotra);
    this.RegistrationFormGroup.get('educational').patchValue(this.bindUserData.qualification);
    this.RegistrationFormGroup.get('achivement').patchValue(this.bindUserData.achievement);
    this.RegistrationFormGroup.get('addressLine1').patchValue(this.bindUserData.address);
    this.RegistrationFormGroup.get('addressLineCity').patchValue(this.bindUserData.city);
    this.RegistrationFormGroup.get('addressLinePincode').patchValue(this.bindUserData.pinCode);
    this.RegistrationFormGroup.get('jobBusinessType').patchValue(this.bindUserData.occupationType);
    this.RegistrationFormGroup.get('jobBusinessName').patchValue(this.bindUserData.occupationName);
    this.RegistrationFormGroup.get('description').patchValue(this.bindUserData.occupationDescription);
  }
}
