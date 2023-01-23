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
  isAdmin : any;
  isRegistered : any;
  blankImage = 'assets/images/blank-profile.jpg';
  profilePic : any;

  constructor(private dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any, 
    private http : HttpService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.profileData = this.userData.data.id;
    console.log(this.profileData);
    var base64 = this.profileData.picture.split(",");
    if(base64[1] == "" || base64[1] == null){
      this.profileData.picture = this.sanitizer.bypassSecurityTrustUrl(this.blankImage);
    }
    // this.http.getUserProfileById(this.userData.data.id).subscribe(res => {
    //   this.profileData = res;
    //   console.log(this.profileData);
    // });
    this.isAdmin = this.userData.data.isAdmin;
    this.isRegistered = this.userData.data.isRegistered;
  }

  action(status : any){
    // Swal.fire({
    //   title: "Message",
    //   imageUrl: 'assets/illustators/Register.svg',
    //   imageWidth: 400,
    //   imageHeight: 200,
    //   imageAlt: 'Custom image',
    // })

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure to reject this user?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          "id": this.profileData.id,
          "action": status,
        }
        this.http.requestAction(data).subscribe((res : any) =>{
          if(res.status == 1){
            swalWithBootstrapButtons.fire(
              'Rejected!',
              res.message,
              'success'
            )
            this.dialogRef.close(); 
          }
          else{
            swalWithBootstrapButtons.fire(
              'Cancelled',
              res.message,
              'error'
            )
          }
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })
    
  }
}
