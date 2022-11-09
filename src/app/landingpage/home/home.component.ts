import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showDescription1 : boolean = false;
  showDescription2 : boolean = false;

  constructor( private sidebarservice : SidebarService ) { }

  ngOnInit(): void {
  }

  description1(){
    this.showDescription1 = !this.showDescription1;
  }

  description2(){
    this.showDescription2 = !this.showDescription2;
  }


  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

}
