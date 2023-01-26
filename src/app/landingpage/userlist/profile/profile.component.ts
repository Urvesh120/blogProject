import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpService } from '../../../services/http.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //snackbar position 
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  profileData : any;
  isAdmin = false;
  isRegistered : any;
  blankImage = 'assets/images/blank-profile.jpg';
  closeButton = 'assets/icons/close.png';
  profilePic : any;

  constructor(private dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any, 
    private http : HttpService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    debugger
    this.profileData = this.userData.data.profileData;
    console.log(this.profileData);
    this.isRegistered = this.userData.data.isRegistered;
    this.isAdmin = this.userData.data.isAdmin;
    var base64 = this.profileData.picture.split(",");
    if(base64[1] == "" || base64[1] == null){
      this.profileData.picture = this.sanitizer.bypassSecurityTrustUrl(this.blankImage);
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
            }
            else{
              Swal.fire(
                res.message,
                '',
                'error'
              )
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
        }
        else{
          Swal.fire(
            res.message,
            '',
            'error'
          )
        }
      });
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
