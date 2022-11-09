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

  menus : any =  [];

  constructor( private router : Router, private sidebarservice : SidebarService) { 
  }

  ngOnInit(): void {
    this.menus = this.sidebarservice.getMenuList();
  }

  routeToLogin(){
    this.router.navigate(['/auth/login']);
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu : any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element : any) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu : any) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

}
