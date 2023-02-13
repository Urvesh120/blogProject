import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpService } from '../../../services/http.service';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/services/loader.service';


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
  isRegistered : any;
  blankImage = 'assets/images/blank-profile.jpg';
  closeButton = 'assets/icons/close.png';
  profilePic : any;
  address = "";

  constructor(private http : HttpService, private sanitizer: DomSanitizer, private loader : LoaderService) { }

  ngOnInit(): void {
    this.http.getUserProfileById(localStorage.getItem('UserId')).subscribe((x : any) => {
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
