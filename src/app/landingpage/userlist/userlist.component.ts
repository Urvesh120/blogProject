import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { UtilService } from 'src/app/services/util.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})

export class UserlistComponent implements OnInit {

  display = false;
  haveEmail = false;
  profileData : any;
  userId : any;
  userType : any;
  isRegistered : any;
  blankImage = 'assets/images/blank-profile.jpg';
  closeButton = 'assets/icons/close.png';
  profilePic : any;
  address = "";

  viewProfile = 'assets/icons/view_profile.svg';
  approve = 'assets/icons/check.png';
  denied = 'assets/icons/close.png';

  registeredUserSearch!: string;
  unregisteredUserSearch!: string;
  pendingUserList: any = [];
  registeredUserList: any = [];
  isAdmin = false;

  isUserManagement = true;
  isRegisteredUsers = true;

  isBloodGroup = false;
  selectedBloodGroup = '';

  isMatchMaking = false;
  selectedAgeForMatchMaking = 0;
  selectedGenderForMatchMaking = '';
  minAge = 0;
  maxAge = 0;

  isOccupational = false;
  selectedOccupation = 'job';
  occupationSearch: string = '';

  constructor(private http : HttpService,  private loader : LoaderService, private util : UtilService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') == 'true' ? true : false;
    this.isMatchMaking = !this.isAdmin;
    this.getUserLIst();
  }

  getUserLIst(){
    if(this.isAdmin){
      //pending user
      this.http.pendingUserList().subscribe((res : any) => {
        if(res.status == 1){
          this.pendingUserList = res.payload; 
        }
        else{
          this.errorMesaaage(res.message);
        }
        });

        //register user
        this.http.adminUserlist().subscribe((res : any) => {
          if(res.status == 1){
            this.registeredUserList = res.payload;
            this.loader.hide();
          }
          else {
            this.errorMesaaage(res.message);
            this.loader.hide();
          }
        });
    }
    else{
      this.http.userlist().subscribe((res : any) => {
        if(res.status == 1){
          this.registeredUserList = res.payload;
        }
        else{
          this.errorMesaaage(res.message);
        }
      });
    } 
    this.loader.hide(); 
  }

  errorMesaaage(message: string) {
    Swal.fire({
      title: message,
      imageUrl: 'assets/illustators/SomethingWentWrong.svg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Something Went Wrong',
    })
  }

  get filteredRegisteredUser(): any[] {
    if (!this.registeredUserSearch) {
      return this.registeredUserList;
    }
    return this.registeredUserList.filter((person: any) =>
      person.firstName.toLowerCase().includes(this.registeredUserSearch.toLowerCase()) ||
      person.middleName.toLowerCase().includes(this.registeredUserSearch.toLowerCase()) ||
      person.lastName.toLowerCase().includes(this.registeredUserSearch.toLowerCase()) ||
      person.contact.toLowerCase().includes(this.registeredUserSearch.toLowerCase())
    );
  }
  
  get filteredPendingUser(): any[] {
    if (!this.unregisteredUserSearch) {
      return this.pendingUserList;
    }
    return this.pendingUserList.filter((person: any) =>
      person.firstName.toLowerCase().includes(this.unregisteredUserSearch.toLowerCase()) ||
      person.middleName.toLowerCase().includes(this.unregisteredUserSearch.toLowerCase()) ||
      person.lastName.toLowerCase().includes(this.unregisteredUserSearch.toLowerCase()) ||
      person.contact.toLowerCase().includes(this.unregisteredUserSearch.toLowerCase())
    );
  }

  get filteredBloodGroup(): any[] {
    return this.registeredUserList.filter((person: any) =>
      person.bloodGroup.toLowerCase().includes(this.selectedBloodGroup.toLowerCase()) &&
      person.age <= 50
    );
  }

  get filteredOccupation(): any[] {
    return this.registeredUserList.filter((person: any) =>
      person.occupationType.toLowerCase().includes(this.selectedOccupation.toLowerCase()) &&
      (person.occupationName.toLowerCase().includes(this.occupationSearch.toLowerCase()) ||
      person.occupationDescription.toLowerCase().includes(this.occupationSearch.toLowerCase()))
    );    
  }
  
  get filteredMatchMaking(): any[] {
    if((this.minAge == 0 && this.maxAge == 0) || this.selectedGenderForMatchMaking == ''){
      if(this.selectedAgeForMatchMaking == 0 && this.selectedGenderForMatchMaking != ''){
        return this.registeredUserList.filter((person: any) =>
          person.gender.toLowerCase() == this.selectedGenderForMatchMaking.toLowerCase()
        );
      }
      else if(!(this.minAge == 0 && this.maxAge == 0) && this.selectedGenderForMatchMaking == ''){
        return this.registeredUserList.filter((person: any) =>
          person.age >= this.minAge && person.age <= this.maxAge
        );
      }
      else{
        return this.registeredUserList;
      }
    }

    else{
      return this.registeredUserList.filter((person: any) =>
        person.gender.toLowerCase().includes(this.selectedGenderForMatchMaking.toLowerCase()) &&
        person.age >= this.minAge && person.age <= this.maxAge
      );
    }
  }

  setData(element : any, type : string){
    this.util.setId(element.id);
    this.util.setUserType(type);
  }

  changeRadioButton(event: any){
    switch(event.target.value){
      case "user-management":
        this.isUserManagement = true;
        this.isBloodGroup = false;
        this.isMatchMaking = false;
        this.isOccupational = false;
        break;
      case "blood-group":
        this.isUserManagement = false;
        this.isBloodGroup = true;
        this.isMatchMaking = false;
        this.isOccupational = false;
        break;
      case "match-making":
        this.isUserManagement = false;
        this.isBloodGroup = false;
        this.isMatchMaking = true;
        this.isOccupational = false;
        break;
      case "occupational":
        this.isUserManagement = false;
        this.isBloodGroup = false;
        this.isMatchMaking = false;
        this.isOccupational = true;
        break;
    }
  }

  userManagementSelection(event: any){
    this.isRegisteredUsers = event.target.value == 'registered-users' ? true : false;
  }

  bloodGroupSelection(event: any){
    switch(event.target.value){
      case 'ab-p':
        this.selectedBloodGroup = 'AB+';
        break;
      case 'ab-n':
        this.selectedBloodGroup = 'AB-';
        break;
      case 'a-p':
        this.selectedBloodGroup = 'A+';
        break;
      case 'a-n':
        this.selectedBloodGroup = 'A-';
        break;
      case 'b-p':
        this.selectedBloodGroup = 'B+';
        break;
      case 'b-n':
        this.selectedBloodGroup = 'B-';
        break;
      case 'o-p':
        this.selectedBloodGroup = 'O+';
        break;
      case 'o-n':
        this.selectedBloodGroup = 'O-';
        break;
    }
  }

  occupationSelection(event: any){
    this.selectedOccupation = event.target.value;
  }

  matchMakingAgeSelection(event: any){
    switch(event.target.value){
      case "one":
        this.minAge = 18;
        this.maxAge = 25;
        break;
      case "two":
        this.minAge = 26;
        this.maxAge = 30;
        break;
      case "three":
        this.minAge = 31;
        this.maxAge = 35;
        break;
      case "four":
        this.minAge = 36;
        this.maxAge = 40;
        break;
      case "five":
        this.minAge = 41;
        this.maxAge = 45;
        break;
      case "six":
        this.minAge = 46;
        this.maxAge = 50;
        break;
      case "seven":
        this.minAge = 50;
        this.maxAge = 200;
        break;
    }
  }

  matchMakingGenderSelection(event: any){
    this.selectedGenderForMatchMaking = event.target.value;
  }

  action(user:any, status : any){
    let data = {
      "id": user.id,
      "action": status,
    }
    //for rejection of user
    if(status == false)
    {
      Swal.fire({
        title: 'Are you sure to reject this user?',
        imageUrl: 'assets/illustators/Confirmation.svg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'confirmation image',
        showCancelButton: true,
        confirmButtonColor: '#039487',
        cancelButtonColor: '#e50000',
        confirmButtonText: 'Yes, Reject !'
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.requestAction(data).subscribe((res : any) => {
            if(res.status == 1){
              this.getUserLIst();
              Swal.fire(
                res.message,
                '',
                'success'
              ).then(function(){
                window.location.reload();
              })
              this.loader.hide()
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
      })
    }
    //for approval of user
    else{
      this.http.requestAction(data).subscribe((res : any) => {
        if(res.status == 1){
          Swal.fire(
            res.message,
            '',
            'success'
          )
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
  }

  getProfileData(id: any){
    this.profileData = null;
    this.display = false;
    this.http.getUserProfileById(id).subscribe((x : any) => {
      if(x.status == 1){
        this.profileData = x.payload;
        this.isAdmin = localStorage.getItem('isAdmin') == "true" ? true : false;
        var base64 = this.profileData.picture.split(",");
        if(base64[1] == "" || base64[1] == null){
          this.profileData.picture = this.sanitizer.bypassSecurityTrustUrl(this.blankImage);
        }
        else{
          this.profileData.picture = this.sanitizer.bypassSecurityTrustUrl(this.profileData.picture);
        }

        if(!!this.profileData.email){
          this.haveEmail = true;
        }

        if(!!this.profileData.address){
          this.address = this.profileData.address + ","
        }

        if(!!this.profileData.landmark){
          this.address = this.profileData.landmark + ","
        }

        if(!!this.profileData.city){
          this.address = this.profileData.city + "-"
        }

        if(!!this.profileData.address){
          this.address = this.profileData.address + "."
        }
        this.display = true;
      }
      else{
        Swal.fire({
          title: x.message,
          imageUrl: 'assets/illustators/SomethingWentWrong.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Something Went Wrong',
        })
      }
      this.loader.hide();
    });
  }
}