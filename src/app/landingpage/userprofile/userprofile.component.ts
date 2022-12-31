import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
// import { SafePipe } from 'src/app/services/safe.pipe';

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
  image : any;

  constructor(private http : HttpService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.http.getUserProfileById(localStorage.getItem('UserId')).subscribe((res : any) => {
      this.userData = res;
      if(!!this.userData.picture){
        this.image = this.sanitizer.bypassSecurityTrustUrl(this.userData.picture);
        this.isImage = true;
      }
      if(!!this.userData.description){
        this.isDescription = true;
      }
    });
  }

}
