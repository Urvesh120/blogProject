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
  isAdmin = false;
  isUser = false;
  username : any;

  constructor( private router : Router) { 
  }

  ngOnInit(): void {
    this.emailId = localStorage.getItem('userEmailId'); 
    if(!!this.emailId){
      if(this.emailId == "admin@email.com"){
        this.isAdmin = true;
      }
      else{
        this.isUser = true;
      }
    }
    this.username = "User Name";
  }

  routeToLogin(){
    this.router.navigate(['/auth/login']);
  }
}
