import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { MatTableDataSource } from '@angular/material/table';

export interface userData {
  id: any;
  firstName: any;
  lastName: any;
  email: any;
  contact: any;
  bloodGroup: any;
  occupation: any;
  description : any;
  address: any;
  picture: any;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  pendingUserList : userData[] = [];
  registeredUserList : userData[] = [];
  registeredUserDataSource : any;
  pendingUserDataSource : any;
  emailId : any;
  isLogedIn = false;
  isAdmin = false;
  isUser = false;
  columns = [
    'First_Name', 
    'Last_Name', 
    'Email', 
    'Contact', 
    'Bloodgroup', 
    'Occupation', 
    'Address',  
    'Action'];

  constructor(private http : HttpService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('userEmailId')){
      this.isLogedIn = true;
      this.emailId = localStorage.getItem('userEmailId'); 
      if(this.emailId == "admin@email.com"){
        this.isAdmin = true;
        this.http.pendingUserList().subscribe((res : any) => {
          this.pendingUserList = res;
          this.pendingUserDataSource = new MatTableDataSource<userData>(this.pendingUserList);
          this.pendingUserDataSource.filterPredicate = function(data : userData, filter : any): boolean {
            return data.firstName.toLowerCase().includes(filter) || 
            data.lastName.toLowerCase().includes(filter) || 
            data.email.toLowerCase().includes(filter) || 
            data.contact.toLowerCase().includes(filter) || 
            data.bloodGroup.toLowerCase().includes(filter) || 
            data.occupation.toLowerCase().includes(filter) || 
            data.address.toString().includes(filter)};
          });
        }
      this.isUser = true;
      this.http.userlist().subscribe((res : any) => {
        this.registeredUserList = res;
        this.registeredUserDataSource = new MatTableDataSource<userData>(this.registeredUserList);
        this.registeredUserDataSource.filterPredicate = function(data : userData, filter : any): boolean {
          return data.firstName.toLowerCase().includes(filter) || 
          data.lastName.toLowerCase().includes(filter) || 
          data.email.toLowerCase().includes(filter) || 
          data.contact.toLowerCase().includes(filter) || 
          data.bloodGroup.toLowerCase().includes(filter) || 
          data.occupation.toLowerCase().includes(filter) || 
          data.address.toString().includes(filter)};
      });
    }
  }

  registerListFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.registeredUserDataSource.filter = filter.trim().toLowerCase();
  }

  pendingListFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.pendingUserDataSource.filter = filter.trim().toLowerCase();
  }

  openDialog(profileData : any, isRegistered : any){  
    let data = {
      "profileData" : profileData,
      "isAddmin" : true,
      "isRegistered" : isRegistered
    }
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '500px',
      data: {data},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
