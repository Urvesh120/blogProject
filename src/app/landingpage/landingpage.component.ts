import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

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
  emailId : any;
  isLogedIn = false;
  isAdmin = false;
  isUser = false;
  username : any;
  logedout = false;
  image : any;

  constructor( private router : Router) { 
  }

  ngOnInit(): void {
    if(localStorage.getItem('userEmailId')){
      this.isLogedIn = true;
      this.image = localStorage.getItem('profilePic');
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
    this.router.navigate(['']);
    setTimeout(
      function() {
        window.location.reload();
      }, 1000);
  }
}
