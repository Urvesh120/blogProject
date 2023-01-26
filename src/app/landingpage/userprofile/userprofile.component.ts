import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { EditprofileComponent } from './editprofile/editprofile.component';

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

  constructor(private http : HttpService, private sanitizer: DomSanitizer, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.getUserProfileById(localStorage.getItem('UserId')).subscribe((res : any) => {
      this.userData = res.payload;
      console.log(this.userData);
      let profile = this.userData.picture.split(",");
      if(!!profile[1]){
        this.isImage = true;
        this.image = this.sanitizer.bypassSecurityTrustUrl(this.userData.picture);
      }
      if(!!this.userData.description){
        this.isDescription = true;
      }
    });
  }

  openDialog(){  
    const dialogRef = this.dialog.open(EditprofileComponent, {
      width: '500px',
      data: {data : this.userData},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
