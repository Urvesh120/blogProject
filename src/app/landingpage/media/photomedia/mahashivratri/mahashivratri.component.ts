import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-mahashivratri',
  templateUrl: './mahashivratri.component.html',
  styleUrls: ['./mahashivratri.component.scss']
})
export class MahashivratriComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
