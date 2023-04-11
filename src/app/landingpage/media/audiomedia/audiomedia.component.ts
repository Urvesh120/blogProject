import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audiomedia',
  templateUrl: './audiomedia.component.html',
  styleUrls: ['./audiomedia.component.scss']
})
export class AudiomediaComponent implements OnInit {

  image1Path  = "../../../assets/images/imageSlider1.png";
  image2Path  = "../../../assets/images/imageSlider2.png";
  image3Path  = "../../../assets/images/Rang-Avadhot-1.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}
