import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

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

  constructor(private http : HttpService) { }

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
      else{
        this.isUser = true;
        this.http.userlist().subscribe((res : any) => {
          this.pendingUserList = res.PendingRequests;
        });
      }
    }
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
