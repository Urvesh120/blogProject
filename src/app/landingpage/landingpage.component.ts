import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
    if(localStorage.getItem('userEmailId')){
      this.userId = localStorage.getItem('UserId'); 
      this.http.getUserProfileById(this.userId).subscribe((res : any) => {
        let picture = res.payload.picture.split(",");
        if(!!picture[1]){
          this.image = this.sanitizer.bypassSecurityTrustUrl(res.payload.picture);
        }
        else{
          this.image = this.blankImage;
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
