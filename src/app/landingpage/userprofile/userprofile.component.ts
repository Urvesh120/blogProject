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
  abc : any;
  image : any;
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
        console.log(this.userData);
        let profile = this.userData.picture.split(",");
        if(!!profile[1]){
          this.isImage = true;
          this.image = this.sanitizer.bypassSecurityTrustUrl(this.userData.picture);
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
        console.log(this.userData);
        
        this.RegistrationFormGroup = this.fb.group({
          firstname: [this.userData.firstName || '', Validators.required],
          middlename: [this.userData.middleName || '', [Validators.required]],
          lastname: [this.userData.lastName || '', [Validators.required]],
          ffirstname: [this.userData.fathersName || '', [Validators.required]],
          fmiddlename: [this.userData.fathersName || '', [Validators.required]],
          flastname: [this.userData.fathersName || '', [Validators.required]],
          mothername: [this.userData.mothersName || '', [Validators.required]],
          dialcode : [this.userData.countryCode || '', [Validators.required]],
          contact: [this.userData.contact || '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          country : [this.userData.country || '', [Validators.required]],
          // email: ['', [Validators.required, Validators.email]],
          email: [this.userData.email || '', [Validators.email]],
          dateofbirth : [this.userData.dateOfBirth || '', [Validators.required]],
          bloodgroup: [this.userData.bloodGroup || '', [Validators.required]],
          gender: [this.userData.gender || '', [Validators.required]],
          maritalstatus: [this.userData.maritalStatus || '', [Validators.required]],
          gotra: [this.userData.gotra || '', [Validators.required]],
          educational: [this.userData.qualification || '', [Validators.required]],
          achivement: [this.userData.achievement || ''],
          addressLine1: [this.userData.address || '', [Validators.required]],
          addressLineLandmark: [this.userData.landmark || ''],
          addressLineCity: [this.userData.city || '', [Validators.required]],
          addressLinePincode: [this.userData.pinCode || '', [Validators.required]],
          jobBusinessType: [this.userData.occupationType || '', [Validators.required]],
          jobBusinessName: [this.userData.occupationName || '', [Validators.required]],
          description: [this.userData.occupationDescription || '', [Validators.required]],
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
      }
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

}
