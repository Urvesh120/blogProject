import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-audiomedia',
  templateUrl: './audiomedia.component.html',
  styleUrls: ['./audiomedia.component.scss']
})
export class AudiomediaComponent implements OnInit {

  image1Path  = "../../../assets/images/imageSlider1.png";
  image2Path  = "../../../assets/images/imageSlider2.png";
  image3Path  = "../../../assets/images/Rang-Avadhot-1.jpg";

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
