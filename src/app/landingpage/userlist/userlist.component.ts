import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  pendingUserList : any;

  data = [{
    "email": 'sdfsdc',
    "firstName": 'asasc',
    "lastName": 'scasc',
    "password": 'ascasc',
  }];

  constructor(private http : HttpService) { }

  ngOnInit(): void {
    this.pendingUserList = this.data;
    // this.http.pendungUserList().subscribe((res : any) => {
    //   this.pendingUserList = res.PendingRequests;
    // });
  }

  displayedColumns: string[] = ['First Name', 'Last Name', 'Email', 'Action'];

  action(element : any, status : any){
    let data = {
      "id": element.id,
      "action": status,
    }
    this,this.http.requestAction(data).subscribe((res : any) =>{
      console.log(res);
    });
  }

}
