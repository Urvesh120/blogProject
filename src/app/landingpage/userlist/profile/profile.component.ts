import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpService } from '../../../services/http.service';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/services/loader.service';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  display = false;
  haveEmail = false;
  profileData : any;
  isAdmin = false;
  userId : any;
  userType : any;
  isRegistered : any;
  blankImage = 'assets/images/blank-profile.jpg';
  closeButton = 'assets/icons/close.png';
  profilePic : any;
  address = "";

  constructor(
    private http : HttpService, 
    private sanitizer: DomSanitizer, 
    private loader : LoaderService, 
    private util : UtilService,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.util.getId().subscribe(x => this.userId = x);
    console.log("ABC : ", this.userId)
    if(!!this.userId){
      this.util.getUserType().subscribe(x => this.userType = x);
      this.http.getUserProfileById(this.userId).subscribe((x : any) => {
        if(x.status == 1){
          this.profileData = x.payload;
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
          this.loader.hide();
          if(localStorage.getItem('isAdmin') == "true"){
            this.isAdmin = true;
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
          this.loader.hide();
        }
      });
    }
    else{
      this.route.navigate(['./user-list']);
    }
    
  }

  action(status : any){
    let data = {
      "id": this.profileData.id,
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
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Reject !'
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.requestAction(data).subscribe((res : any) => {
            if(res.status == 1){
              Swal.fire(
                res.message,
                '',
                'success'
              )
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
}
