import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-nandikeshwarmahadev',
  templateUrl: './nandikeshwarmahadev.component.html',
  styleUrls: ['./nandikeshwarmahadev.component.scss']
})
export class NandikeshwarmahadevComponent implements OnInit {

  imageLink = "https://cdn.shopify.com/s/files/1/0162/2116/articles/Most_Stylish_Glasses_For_Men_300x300.jpg?v=1596724226";

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
