import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photomedia',
  templateUrl: './photomedia.component.html',
  styleUrls: ['./photomedia.component.scss']
})
export class PhotomediaComponent implements OnInit {

  image1Path  = "../../../assets/images/imageSlider1.jpeg";

  constructor() { }

  ngOnInit(): void {
  }

}
