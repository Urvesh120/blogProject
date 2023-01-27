import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';
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
  profileImage : any;
  selectedValue : any;

  profileData : any;
  model!: NgbDateStruct;

  RegistrationFormGroup: any;
  isJob : boolean = true;
  isOccupationSelected : boolean = false;

  disabled = true;

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
    'Married',
    'Unmarried',
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
    private sanitizer: DomSanitizer,
    private loader : LoaderService,
    private dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any) { }

  ngOnInit(): void {
    this.profileData = this.userData.data;
    let profilePicture = this.profileData.picture.split(","); 
    if(!!profilePicture[1]){
      this.profileImage = this.sanitizer.bypassSecurityTrustUrl(this.profileData.picture);
    }
    else{
      this.profileImage = this.blankImage;
    }
    
    if(!!this.profileData.address){
      var address = this.profileData.address.split(",");
      if(!!address[2]){
        var pincode = address[2].split("-");
      }
    }

    var fathersName = this.profileData.fathersName.split(" ");
    
    this.RegistrationFormGroup = this.fb.group({
      firstname: [this.profileData.firstName || '', Validators.required],
      middlename: [this.profileData.middleName || '', [Validators.required]],
      lastname: [this.profileData.lastName || '', [Validators.required]],
      ffirstname: [fathersName[1] || '', [Validators.required]],
      fmiddlename: [fathersName[2] || '', [Validators.required]],
      flastname: [fathersName[0] || '', [Validators.required]],
      dialcode : [this.profileData.countryCode || '', [Validators.required]],
      contact: [this.profileData.contact || '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      country : [this.profileData.country || '', [Validators.required]],
      email: [this.profileData.email || '', [Validators.email]],
      dateofbirth : [this.profileData.dateOfBirth || '', [Validators.required]],
      bloodgroup: [this.profileData.bloodGroup || '', [Validators.required]],
      gender: [this.profileData.gender || '', [Validators.required]],
      maritalstatus: [this.profileData.maritalStatus || '', [Validators.required]],
      gotra: [this.profileData.gotra || '', [Validators.required]],
      educational: [this.profileData.qualification || '', [Validators.required]],
      achivement: [this.profileData.achievement || ''],
      addressLine1: [address[0] || '', [Validators.required]],
      addressLineLandmark: [address[1] || ''],
      addressLineCity: [pincode[0] || '', [Validators.required]],
      addressLinePincode: [pincode[1] || '', [Validators.required]],
      jobBusinessType: [this.profileData.occupationType || '', [Validators.required]],
      jobBusinessName: [this.profileData.occupationName || '', [Validators.required]],
      description: [this.profileData.occupationDescription || '', [Validators.required]],
    });

      if(this.profileData.occupationType == this.occupationList[0]){
        this.isOccupationSelected = true;
        this.isJob = true;
      }
      if(this.profileData.occupationType == this.occupationList[1]){
        this.isOccupationSelected = true;
        this.isJob = false;
      }
  }

  abc(event : any){
    if(event == this.occupationList[0]){
      this.isOccupationSelected = true;
      this.isJob = true;
    }
    if(event == this.occupationList[1]){
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
        this.profileImage = event.target.result;
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
    return this.RegistrationFormGroup.get('ffirstname').disable();
  }
  
  get fmiddlename() {
    return this.RegistrationFormGroup.get('fmiddlename').disable();
  }

  get flastname() {
    return this.RegistrationFormGroup.get('flastname').disable();
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
    return this.RegistrationFormGroup.get('dateofbirth').disable();
  }
  
  get bloodgroup() {
    return this.RegistrationFormGroup.get('bloodgroup').disable();
  }
  
  get gender() {
    return this.RegistrationFormGroup.get('gender').disable();
  }
  
  get maritalstatus() {
    return this.RegistrationFormGroup.get('maritalstatus');
  }
  
  get gotra() {
    return this.RegistrationFormGroup.get('gotra').disable();
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
    let address = 
      this.RegistrationFormGroup.value.addressLine1 + "," +
      this.RegistrationFormGroup.value.addressLineLandmark + "," +
      this.RegistrationFormGroup.value.addressLineCity + "-" +
      this.RegistrationFormGroup.value.addressLinePincode + ".";
    let data = {
      "id" : this.profileData.id,
      "picture": this.profileImage.changingThisBreaksApplicationSecurity,
      "pictureType": this.imageType,
      "firstName" : this.RegistrationFormGroup.value.firstname,
      "middleName" : this.RegistrationFormGroup.value.middlename,
      "lastName" : this.RegistrationFormGroup.value.lastname,
      "fathersName" : this.profileData.fathersName,
      "contact": this.RegistrationFormGroup.value.contact,
      "email": this.RegistrationFormGroup.value.email,
      "address": address,
      "countryCode" : this.RegistrationFormGroup.value.dialcode,
      "country": this.RegistrationFormGroup.value.country,
      "dateOfBirth" : this.profileData.dateOfBirth,
      "qualification" : this.RegistrationFormGroup.value.educational,
      "achievement" : this.RegistrationFormGroup.value.achivement,
      "bloodGroup": this.profileData.bloodGroup,
      "gender": this.profileData.gender,
      "gotra":this.profileData.gotra,
      "maritalStatus": this.RegistrationFormGroup.value.maritalstatus,
      "occupationType": this.RegistrationFormGroup.value.jobBusinessType,
      "occupationName": this.RegistrationFormGroup.value.jobBusinessName,
      "occupationDescription": this.RegistrationFormGroup.value.description,
    }
    console.log(data);
    this.http.updateprofile(data).subscribe((res : any) =>{
      if(res.status == 1){
        Swal.fire({
          title: res.message,
          imageUrl: 'assets/illustators/RegisterRequestSuccess.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Profile Update Success',
        })
        this.loader.hide();
        this.dialogRef.close();
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

}
