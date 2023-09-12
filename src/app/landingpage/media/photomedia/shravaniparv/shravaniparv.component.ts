import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-shravaniparv',
  templateUrl: './shravaniparv.component.html',
  styleUrls: ['./shravaniparv.component.scss']
})
export class ShravaniparvComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
