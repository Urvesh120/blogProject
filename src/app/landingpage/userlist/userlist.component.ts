import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';

export interface tableData {
  id: any;
  firstName: any;
  middleName: any;
  lastName: any;
  fatherName: any;
  email: any;
  contact: any;
  occupation: any;
  address: any;
}


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  pendingUserList : tableData[] = [];
  registeredUserList : tableData[] = [];
  registeredUserDataSource : any;
  pendingUserDataSource : any;
  emailId : any;
  isLogedIn = false;
  isAdmin = false;
  isUser = false;
  job!: boolean;
  pendingData !: tableData[];
  registerData !: tableData[];
  business!: boolean;
  filterValues: any = {};
  columns : any = ['First_Name', 'Middle_Name', 'Last_Name', 'Father_Name', 'Email', 'Contact', 'Occupation', 'Address', 'Action'];

  constructor(private http : HttpService, private dialog: MatDialog, private loader : LoaderService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userEmailId')){
      this.isLogedIn = true;
      this.emailId = localStorage.getItem('userEmailId'); 
      if(this.emailId == "admin@email.com"){
        this.isAdmin = true;
      }
      if(this.isAdmin){
        //pending user
        this.http.pendingUserList().subscribe((res : any) => {
          if(res.status == 1){
            this.pendingUserList = res.payload;
            this.pendingUserDataSource = new MatTableDataSource<tableData>(this.pendingUserList);
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

          //register user
          this.http.adminUserlist().subscribe((res : any) => {
            if(res.status == 1){
              this.registeredUserList = res.payload;
              this.registeredUserDataSource = new MatTableDataSource<tableData>(this.registeredUserList);
              this.loader.hide();
            }
            else {
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
      else{
        this.http.userlist().subscribe((res : any) => {
          if(res.status ==1){
            this.registeredUserList = res.payload;
            this.registeredUserDataSource = new MatTableDataSource<tableData>(this.registeredUserList);
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

  //input search filter
  registerListFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.registeredUserDataSource.filter = filter.trim().toLowerCase();
  }

  pendingListFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.pendingUserDataSource.filter = filter.trim().toLowerCase();
  }

  //jon or business filter
  registerFilter(event : Event){
    debugger
    const filter = (event.target as HTMLInputElement).id;
    this.registeredUserDataSource.filter = filter.trim().toLowerCase();
  }
  
  pendingFilter(event : Event){
    const filter = (event.target as HTMLInputElement).id;
    this.pendingUserDataSource.filter = filter.trim().toLowerCase();
  }

  openDialog(profileData : any, isRegistered : any){ 
    let data = {
      "profileData" : profileData,
      "isAdmin" : this.isAdmin,
      "isRegistered" : isRegistered
    }
    const dialogRef = this.dialog.open(ProfileComponent, {
      // width: '500px',
      data: {data},
      disableClose : true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
