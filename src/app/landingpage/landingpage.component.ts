import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { LoaderService } from '../services/loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class LandingpageComponent implements OnInit {

  selected = 'Trusts';
  userId : any;
  emailId : any;
  isLogedIn = false;
  isAdmin = false;
  isUser = false;
  username : any;
  logedout = false;
  image : any;
  blankImage = 'assets/images/blank-profile.jpg';

  constructor( private router : Router, 
    private http : HttpService,
    private sanitizer: DomSanitizer,
    private loader : LoaderService,
    public translate: TranslateService) { 
      translate.setDefaultLang('guj');
  }

  ngOnInit(): void {
    if(localStorage.getItem('userEmailId')){
      this.userId = localStorage.getItem('UserId'); 
      this.http.getUserProfileById(this.userId).subscribe((res : any) => {
        if(res.status == 1){
          let picture = res.payload.picture.split(",");
          if(!!picture[1]){
            this.image = this.sanitizer.bypassSecurityTrustUrl(res.payload.picture);
          }
          else{
            this.image = this.blankImage;
          }
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
      this.isLogedIn = true;
      // this.image = localStorage.getItem('profilePic');
      this.emailId = localStorage.getItem('userEmailId'); 
      this.username = localStorage.getItem('UserName');
      if(this.emailId == "admin@email.com"){
        this.isAdmin = true;
      }
      else{
        this.isUser = true;
      }
    }
    this.loader.hide();
  }

  changeLanguage(event: any){
    this.translate.use(event.target.value);
    this.loader.hide();
  }

  routeToLogin(){
    this.router.navigate(['/auth/login']);
  }

  logout(){
    this.logedout = true;
    localStorage.removeItem('userEmailId');
    localStorage.removeItem('token');
    localStorage.removeItem('UserName');
    localStorage.removeItem('UserId');
    localStorage.removeItem('profilePic');
    this.router.navigate(['']);
    setTimeout(
      function() {
        window.location.reload();
      }, 500);
  }
}
