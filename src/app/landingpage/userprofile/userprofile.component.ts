import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';

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
  showContent = false;

  constructor(private http : HttpService, private sanitizer: DomSanitizer, private dialog: MatDialog, private loader : LoaderService) { }

  ngOnInit(): void {
    this.http.getUserProfileById(localStorage.getItem('UserId')).subscribe((res : any) => {
      if(res.status == 1){
        this.userData = res.payload;
        let profile = this.userData.picture.split(",");
        if(!!profile[1]){
          this.isImage = true;
          this.image = this.sanitizer.bypassSecurityTrustUrl(this.userData.picture);
        }
        if(!!this.userData.description){
          this.isDescription = true;
        }
        this.loader.hide();
        this.showContent = true;
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

  openDialog(){  
    const dialogRef = this.dialog.open(EditprofileComponent, {
      data: {data : this.userData},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
