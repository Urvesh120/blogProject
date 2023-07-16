import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-datt-yaag',
  templateUrl: './datt-yaag.component.html',
  styleUrls: ['./datt-yaag.component.scss']
})
export class DattYaagComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
