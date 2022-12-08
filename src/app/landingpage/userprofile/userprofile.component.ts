import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { SafePipe } from 'src/app/services/safe.pipe';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  userData : any;
  isImage = false;
  isDescription = false;
  abc : any;

  constructor(private http : HttpService, private safe : SafePipe) { }

  ngOnInit(): void {
    this.http.getUserProfileById(localStorage.getItem('UserId')).subscribe((res : any) => {
      // console.log(res);
      this.abc = this.safe.transform(this.userData.picture, "url");
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
