import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mandal',
  templateUrl: './mandal.component.html',
  styleUrls: ['./mandal.component.scss']
})
export class MandalComponent implements OnInit {

  image1Path  = "../../../assets/images/imageSlider1.jpeg";

  constructor() { }

  ngOnInit(): void {
  }

}
