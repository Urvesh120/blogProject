import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showDescription1 : boolean = false;
  showDescription2 : boolean = false;
  image1Path  = "../../../assets/images/imageSlider1.jpeg";
  image2Path  = "../../../assets/images/imageSlider2.jpeg";

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

  description1(){
    this.showDescription1 = !this.showDescription1;
  }

  description2(){
    this.showDescription2 = !this.showDescription2;
  }
}
