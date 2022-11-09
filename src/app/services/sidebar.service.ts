import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'Home',
      icon: 'fa fa-house-user',
      active: true,
      type: 'simple',
    },
    {
      title: 'Trusts',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Trust 1',
        },
        {
          title: 'Trust 2'
        },
        {
          title: 'Trust 3'
        }
      ]
    },
    {
      title: 'Profile',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
    },
    {
      title: 'About',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
    },
    {
      title: 'Login',
      icon: 'fa fa-right-to-bracket',
      active: false,
      type: 'simple',
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}