import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-shree-bhagvd-katha',
  templateUrl: './shree-bhagvd-katha.component.html',
  styleUrls: ['./shree-bhagvd-katha.component.scss']
})
export class ShreeBhagvdKathaComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
