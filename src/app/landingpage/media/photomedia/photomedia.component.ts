import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-photomedia',
  templateUrl: './photomedia.component.html',
  styleUrls: ['./photomedia.component.scss']
})
export class PhotomediaComponent implements OnInit {

  image1Path  = "../../../assets/images/imageSlider1.jpeg";

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
