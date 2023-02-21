import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  userData : any;
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
  isJob : boolean = true;
  isOccupationSelected : boolean = false;
  blankImage = 'assets/images/blank-profile.jpg';

  

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
    'Business'
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

  constructor(private http : HttpService, 
    private sanitizer: DomSanitizer, 
    private dialog: MatDialog, 
    private loader : LoaderService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.http.getUserProfileById(localStorage.getItem('UserId')).subscribe((res : any) => {
      if(res.status == 1){
        this.userData = res.payload;
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
          this.address = this.userData.address + ","
        }

        if(!!this.userData.landmark){
          this.address = this.userData.landmark + ","
        }

        if(!!this.userData.city){
          this.address = this.userData.city + "-"
        }

        if(!!this.userData.address){
          this.address = this.userData.address + "."
        }

        this.loader.hide();
        this.showContent = true; 
        
        this.RegistrationFormGroup = this.fb.group({
          firstname: [{value: this.userData.firstName || '', disabled: this.disabled}, Validators.required],
          middlename: [{value: this.userData.middleName || '', disabled: this.disabled}, [Validators.required]],
          lastname: [{value: this.userData.lastName || '', disabled: this.disabled}, [Validators.required]],
          ffirstname: [{value: this.userData.fathersName || '', disabled: this.disabled}, [Validators.required]],
          mothername: [{value: this.userData.mothersName || '', disabled: this.disabled}, [Validators.required]],
          dialcode : [{value: this.userData.countryCode || '', disabled: this.disabled}, [Validators.required]],
          contact: [{value: this.userData.contact || '', disabled: this.disabled}, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          country : [{value: this.userData.country || '', disabled: this.disabled}, [Validators.required]],
          email: [{value: this.userData.email || '', disabled: this.disabled}, [Validators.email]],
          dateofbirth : [{value: this.userData.dateOfBirth || '', disabled: this.disabled}, [Validators.required]],
          bloodgroup: [{value: this.userData.bloodGroup || '', disabled: this.disabled}, [Validators.required]],
          gender: [{value: this.userData.gender || '', disabled: this.disabled}, [Validators.required]],
          maritalstatus: [{value: this.userData.maritalStatus || '', disabled: this.disabled}, [Validators.required]],
          gotra: [{value: this.userData.gotra || '', disabled: this.disabled}, [Validators.required]],
          educational: [{value: this.userData.qualification || '', disabled: this.disabled}, [Validators.required]],
          achivement: [{value: this.userData.achievement || '', disabled: this.disabled}],
          addressLine1: [{value: this.userData.address || '', disabled: this.disabled}, [Validators.required]],
          addressLineLandmark: [{value: this.userData.landmark || '', disabled: this.disabled}],
          addressLineCity: [{value: this.userData.city || '', disabled: this.disabled}, [Validators.required]],
          addressLinePincode: [{value: this.userData.pinCode || '', disabled: this.disabled}, [Validators.required]],
          jobBusinessType: [{value: this.userData.occupationType || '', disabled: this.disabled}, [Validators.required]],
          jobBusinessName: [{value: this.userData.occupationName || '', disabled: this.disabled}, [Validators.required]],
          description: [{value: this.userData.occupationDescription || '', disabled: this.disabled}, [Validators.required]],
        });
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

  abc(event : any){
    console.log(event.target.value);
    if(event.target.value == this.occupationList[0]){
      this.isJob = true;
    }
    if(event.target.value == this.occupationList[1]){
      this.isJob = false;
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
  
  get mothername() {
    return this.RegistrationFormGroup.get('mothername');
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

  openDialog(){  
    const dialogRef = this.dialog.open(EditprofileComponent, {
      data: {data : this.userData},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  enableForm(){
    this.disabled = false;
    this.RegistrationFormGroup.controls['firstname'].enable();
    this.RegistrationFormGroup.controls['middlename'].enable();
    this.RegistrationFormGroup.controls['lastname'].enable();
    this.RegistrationFormGroup.controls['contact'].enable();
    this.RegistrationFormGroup.controls['dialcode'].enable();
    this.RegistrationFormGroup.controls['country'].enable();
    this.RegistrationFormGroup.controls['email'].enable();
    this.RegistrationFormGroup.controls['maritalstatus'].enable();
    this.RegistrationFormGroup.controls['educational'].enable();
    this.RegistrationFormGroup.controls['achivement'].enable();
    this.RegistrationFormGroup.controls['addressLine1'].enable();
    this.RegistrationFormGroup.controls['addressLineLandmark'].enable();
    this.RegistrationFormGroup.controls['addressLineCity'].enable();
    this.RegistrationFormGroup.controls['addressLinePincode'].enable();
    this.RegistrationFormGroup.controls['jobBusinessType'].enable();
    this.RegistrationFormGroup.controls['jobBusinessName'].enable();
    this.RegistrationFormGroup.controls['description'].enable();
  }

  edit(){
    let data = {
      "achievement": this.RegistrationFormGroup.value.achivement,
      "address": this.RegistrationFormGroup.value.addressLine1,
      "bloodGroup": this.userData.bloodGroup,
      "city": this.RegistrationFormGroup.value.addressLineCity,
      "contact": this.RegistrationFormGroup.value.contact,
      "country": this.RegistrationFormGroup.value.country,
      "countryCode": this.RegistrationFormGroup.value.dialcode,
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
      "occupationDescription": this.RegistrationFormGroup.value.description,
      "occupationName": this.RegistrationFormGroup.value.jobBusinessName,
      "occupationType": this.RegistrationFormGroup.value.jobBusinessType,
      "picture": this.imageBase64,
      "pictureType": this.imageType,
      "pinCode": this.RegistrationFormGroup.value.addressLinePincode,
      "qualification": this.RegistrationFormGroup.value.educational
    }

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
    // this.RegistrationFormGroup.reset(this.RegistrationFormGroup.value);
    this.RegistrationFormGroup.disable();
    // this.RegistrationFormGroup = this.fb.group({
    //       firstname: [{value: this.userData.firstName || '', disabled: this.disabled}, Validators.required],
    //       middlename: [{value: this.userData.middleName || '', disabled: this.disabled}, [Validators.required]],
    //       lastname: [{value: this.userData.lastName || '', disabled: this.disabled}, [Validators.required]],
    //       ffirstname: [{value: this.userData.fathersName || '', disabled: true}, [Validators.required]],
    //       mothername: [{value: this.userData.mothersName || '', disabled: true}, [Validators.required]],
    //       dialcode : [{value: this.userData.countryCode || '', disabled: this.disabled}, [Validators.required]],
    //       contact: [{value: this.userData.contact || '', disabled: this.disabled}, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    //       country : [{value: this.userData.country || '', disabled: this.disabled}, [Validators.required]],
    //       email: [{value: this.userData.email || '', disabled: this.disabled}, [Validators.email]],
    //       dateofbirth : [{value: this.userData.dateOfBirth || '', disabled: true}, [Validators.required]],
    //       bloodgroup: [{value: this.userData.bloodGroup || '', disabled: true}, [Validators.required]],
    //       gender: [{value: this.userData.gender || '', disabled: true}, [Validators.required]],
    //       maritalstatus: [{value: this.userData.maritalStatus || '', disabled: this.disabled}, [Validators.required]],
    //       gotra: [{value: this.userData.gotra || '', disabled: true}, [Validators.required]],
    //       educational: [{value: this.userData.qualification || '', disabled: this.disabled}, [Validators.required]],
    //       achivement: [{value: this.userData.achievement || '', disabled: this.disabled}],
    //       addressLine1: [{value: this.userData.address || '', disabled: this.disabled}, [Validators.required]],
    //       addressLineLandmark: [{value: this.userData.landmark || '', disabled: this.disabled}],
    //       addressLineCity: [{value: this.userData.city || '', disabled: this.disabled}, [Validators.required]],
    //       addressLinePincode: [{value: this.userData.pinCode || '', disabled: this.disabled}, [Validators.required]],
    //       jobBusinessType: [{value: this.userData.occupationType || '', disabled: this.disabled}, [Validators.required]],
    //       jobBusinessName: [{value: this.userData.occupationName || '', disabled: this.disabled}, [Validators.required]],
    //       description: [{value: this.userData.occupationDescription || '', disabled: this.disabled}, [Validators.required]],
    // });
  }

}
