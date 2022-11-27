import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  pendingUserList : any;
  emailId : any;
  isLogedIn = false;
  isAdmin = false;
  isUser = false;
  displayedColumns: any;
  showEmptyDataMessage : any;

  // userlist = [
  //   {firstName : 'FN1', lastName : 'LN1', email : 'E1'},
  //   {firstName : 'FN2', lastName : 'LN2', email : 'E2'},
  //   {firstName : 'FN3', lastName : 'LN3', email : 'E3'},
  //   {firstName : 'FN4', lastName : 'LN4', email : 'E4'},
  //   {firstName : 'FN5', lastName : 'LN5', email : 'E5'},
  // ]

  constructor(private http : HttpService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.showEmptyDataMessage = false;
    // this.displayedColumns = ['First Name', 'Last Name', 'Email', 'Action'];
    // this.pendingUserList = this.userlist;
    if(localStorage.getItem('userEmailId')){
      this.isLogedIn = true;
      this.emailId = localStorage.getItem('userEmailId'); 
      if(this.emailId == "admin@email.com"){
        this.isAdmin = true;
        this.displayedColumns = ['First Name', 'Last Name', 'Email', 'Action'];
        this.http.pendingUserList().subscribe((res : any) => {
          this.pendingUserList = res.PendingRequests;
          console.log(this.pendingUserList);
          // if(this.pendingUserList == undefined || this.pendingUserList == null){
          //   this.showEmptyDataMessage = true;
          // }
        });
      }
      else{
        this.isUser = true;
        this.displayedColumns = ['First Name', 'Last Name', 'Email'];
        this.http.userlist().subscribe((res : any) => {
          this.pendingUserList = res.list;
          // if(this.pendingUserList == undefined || this.pendingUserList == null){
          //   this.showEmptyDataMessage = true;
          // }
        });
      }
    }
  }

  action(element : any, status : any){
    let data = {
      "id": element.id,
      "action": status,
    }
    this,this.http.requestAction(data).subscribe((res : any) =>{});
  }

  openDialog(profileData : any){
    const dialogRef = this.dialog.open(ProfileComponent, {
      // height: '300px',
      width: '500px',
      data: {profileData},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}
