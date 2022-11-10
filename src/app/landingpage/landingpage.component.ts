import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { SidebarService } from '../services/sidebar.service';

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

  constructor( private router : Router, private sidebarservice : SidebarService) { 
  }

  ngOnInit(): void {}

  routeToLogin(){
    this.router.navigate(['/auth/login']);
  }
}
