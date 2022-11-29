import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(private dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any, private http : HttpService) { }

  ngOnInit(): void {
    this.profileData = this.userData.data.profileData;
    this.isAdmin = this.userData.data.isAddmin;
    this.isRegistered = this.userData.data.isRegistered;
  }

  action(status : any){
    let data = {
      "id": this.id,
      "action": status,
    }
    // this.http.requestAction(data).subscribe((res : any) =>{});
  }

}
