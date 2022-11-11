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
  isAdmin = false;
  username : any;

  constructor( private router : Router) { 
  }

  ngOnInit(): void {
    if(localStorage.getItem('userEmailId') == "admin@email.com"){
      this.isAdmin = true;
    }
    this.username = "User Name";
  }

  routeToLogin(){
    this.router.navigate(['/auth/login']);
  }
}
