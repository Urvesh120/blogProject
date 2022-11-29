import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { MatTableDataSource } from '@angular/material/table';

export interface pendingUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface registeredUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  pendingUserList : pendingUser[] = [];
  registeredUserList : registeredUser[] = [];
  registeredUserDataSource !: MatTableDataSource<registeredUser>;
  emailId : any;
  isLogedIn = false;
  isAdmin = false;
  isUser = false;
  columns = ['First Name', 'Last Name', 'Email', 'Action'];

  constructor(private http : HttpService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('userEmailId')){
      this.isLogedIn = true;
      this.emailId = localStorage.getItem('userEmailId'); 
      if(this.emailId == "admin@email.com"){
        this.isAdmin = true;
        this.http.pendingUserList().subscribe((res : any) => {
          this.pendingUserList = res.PendingRequests;
        });
      }
      this.isUser = true;
      this.http.userlist().subscribe((res : any) => {
        this.registeredUserList = res.list;
        this.registeredUserDataSource = new MatTableDataSource<registeredUser>(this.registeredUserList);
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.registeredUserDataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(profileData : any, isRegistered : any){  
    let data = {
      "profileData" : profileData,
      "isAddmin" : true,
      "isRegistered" : isRegistered
    }
    const dialogRef = this.dialog.open(ProfileComponent, {
      // height: '300px',
      width: '500px',
      data: {data},
    });
  }
}
