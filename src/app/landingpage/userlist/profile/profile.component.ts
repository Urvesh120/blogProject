import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpService } from '../../../services/http.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


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
  id : any;
  blankImage = 'assets/images/blank-profile.jpg';
  profilePic : any;

  constructor(private dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any, 
    private http : HttpService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.profileData = this.userData.data.profileData;
    this.id = this.profileData.id
    if(!!this.profileData.picture){
      this.profilePic = this.sanitizer.bypassSecurityTrustResourceUrl(this.profileData.picture);
    }
    else{
      this.profilePic = this.blankImage;
    }
    this.isAdmin = this.userData.data.isAddmin;
    this.isRegistered = this.userData.data.isRegistered;
  }

  action(status : any){
    let data = {
      "id": this.id,
      "action": status,
    }
    this.http.requestAction(data).subscribe((res : any) =>{
      if(res.status == 1){
        this._snackBar.open(res.message, "",{
          duration : 5 * 1000,
          panelClass : ['success'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else{
        this._snackBar.open(res.message, "",{
          duration : 5 * 1000,
          panelClass : ['error'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

}
