import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

  constructor(private http : HttpService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.showEmptyDataMessage = false;
    this.displayedColumns = ['First Name', 'Last Name', 'Email', 'Action'];
    if(localStorage.getItem('userEmailId')){
      this.isLogedIn = true;
      this.emailId = localStorage.getItem('userEmailId'); 
      if(this.emailId == "admin@email.com"){
        this.isAdmin = true;
        this.displayedColumns = ['First Name', 'Last Name', 'Email', 'Action'];
        this.http.pendingUserList().subscribe((res : any) => {
          this.pendingUserList = res.PendingRequests;
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

}
