import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData : any;
  isAdmin : any;
  isRegistered : any;
  id : any;
  blankImage = 'assets/images/blank-profile.jpg';
  profilePic : any;

  constructor(private dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any, private http : HttpService,
    private sanitizer: DomSanitizer) { }

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
    this.http.requestAction(data).subscribe((res : any) =>{});
  }

}
