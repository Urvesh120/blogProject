import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  userData : any;
  isImage = false;
  isDescription = false;

  constructor(private http : HttpService) { }

  ngOnInit(): void {
    this.http.getUserProfileById(localStorage.getItem('UserId')).subscribe((res : any) => {
      this.userData = res;
      if(!!this.userData.picture){
        this.isImage = true;
      }
      if(!!this.userData.description){
        this.isDescription = true;
      }
    });
  }

}
