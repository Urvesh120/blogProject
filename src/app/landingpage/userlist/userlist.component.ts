import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  pendingUserList : any;

  constructor(private http : HttpService) { }

  ngOnInit(): void {
    this.http.pendungUserList().subscribe((res : any) => {
      this.pendingUserList = res.PendingRequests;
      console.log(res);
    });
  }

  displayedColumns: string[] = ['First Name', 'Last Name', 'Email', 'Action'];

  action(element : any, status : any){
    debugger
    let data = {
      "id": element.id,
      "action": status,
    }
    this,this.http.requestAction(data);
    console.log(element);
  }

}
