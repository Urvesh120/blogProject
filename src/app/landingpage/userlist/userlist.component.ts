import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { UtilService } from 'src/app/services/util.service';

export interface tableData {
  id: any;
  firstName: any;
  middleName: any;
  lastName: any;
  fatherName: any;
  email: any;
  contact: any;
  occupationType: any;
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
  pendingData !: tableData[];
  registerData !: tableData[];
  job!: boolean;
  business!: boolean;
  filterValues: any = {};
  pendingMappedData : tableData[] = [];;
  registeredMappedData : tableData[] = [];;
  columns : any = ['First_Name', 'Middle_Name', 'Last_Name', 'Father_Name', 'Email', 'Contact', 'Occupation', 'Address', 'Action'];

  constructor(private http : HttpService, private dialog: MatDialog, private loader : LoaderService, private util : UtilService) { }

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
            this.pendingMappedData = res.payload.map((x : any) => ({
              id : x.id,
              firstName: x.firstName,
              middleName: x.middleName,
              lastName: x.lastName,
              fatherName: x.fatherName,
              email: x.email,
              contact: x.contact,
              occupationType: x.occupationType,
              address: x.address,
            }));
            this.pendingUserDataSource = new MatTableDataSource<tableData>(this.pendingMappedData);
            // this.pendingUserDataSource = new MatTableDataSource<tableData>(this.pendingUserList);
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
              this.registeredMappedData = res.payload.map((x : any) => ({
                id : x.id,
                firstName: x.firstName,
                middleName: x.middleName,
                lastName: x.lastName,
                fatherName: x.fatherName,
                email: x.email,
                contact: x.contact,
                occupationType: x.occupationType,
                address: x.address,
              }));
              this.registeredUserDataSource = new MatTableDataSource<tableData>(this.registeredMappedData);
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
            this.registeredMappedData = res.payload.map((x : any) => ({
              id : x.id,
              firstName: x.firstName,
              middleName: x.middleName,
              lastName: x.lastName,
              fatherName: x.fatherName,
              email: x.email,
              contact: x.contact,
              occupationType: x.occupationType,
              address: x.address,
            }));
            this.registeredUserDataSource = new MatTableDataSource<tableData>(this.registeredMappedData);
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

  //checkbox filter
  applyRegisterFilter(filterValue : any) {
    let filteredData = _.filter(this.registeredUserList,(item : any) => {
      if(!!filterValue){
        return item.occupationType.toLowerCase() == filterValue.toLowerCase()
      }
      else{
        return item;
      }
    })
    this.registeredUserDataSource = new MatTableDataSource(filteredData);
  }
  
  applyPendingFilter(filterValue : any) {
    let filteredData = _.filter(this.pendingUserList,(item : any) => {
      if(!!filterValue){
        return item.occupationType.toLowerCase() == filterValue.toLowerCase()
      }
      else{
        return item;
      }
    })
    this.pendingUserDataSource = new MatTableDataSource(filteredData);
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

  openDialog(profileData : any, isRegistered : any){ 
    let data = {
      "profileData" : profileData,
      "isAdmin" : this.isAdmin,
      "isRegistered" : isRegistered
    }
    const dialogRef = this.dialog.open(ProfileComponent, {
      data: {data},
      disableClose : true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  setData(element : any, type : string){
    this.util.setId(element.id);
    this.util.setUserType(type);
  }
}
