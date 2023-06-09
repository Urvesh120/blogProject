import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as AOS from 'aos';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showDescription1 : boolean = false;
  showDescription2 : boolean = false;
  image1Path  = "../../../assets/images/imageSlider1.png";
  image2Path  = "../../../assets/images/imageSlider2.png";
  image3Path  = "../../../assets/images/Rang-Avadhot-1.jpg";

  firstUserBirthday: any;
  birthdayUserImage:any;
  userCardImage:any;
  isVisitingCard: boolean = false;
  blankImage = 'assets/images/blank-profile.jpg';

  constructor(private httpService: HttpService, private loader : LoaderService, private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    AOS.init();
    this.currentDayBirthday();
  }

  description1(){
    this.showDescription1 = !this.showDescription1;
  }

  description2(){
    this.showDescription2 = !this.showDescription2;
  }

  currentDayBirthday(){
    this.httpService.currentDayBirthday().subscribe((result: any) => {
      if(result.status == 1){
        if(result.payload.length > 0){
          this.firstUserBirthday = result.payload[result.payload.length - 1];
          console.log(this.firstUserBirthday);
          if(!!this.firstUserBirthday.picture){
            this.birthdayUserImage = this.sanitizer.bypassSecurityTrustUrl(this.firstUserBirthday.picture);
          }
          else{
            this.birthdayUserImage = this.sanitizer.bypassSecurityTrustUrl(this.blankImage);
          }
          if(!!this.firstUserBirthday.visitingCard){
            this.isVisitingCard = true;
            this.userCardImage = this.sanitizer.bypassSecurityTrustUrl(this.firstUserBirthday.visitingCard);
          }
        }
        else{
          console.log("Birthday user not found!!")
        }
        this.loader.hide();
      }
      else{
        Swal.fire({
          title: result.message,
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
