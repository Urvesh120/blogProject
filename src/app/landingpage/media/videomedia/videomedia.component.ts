import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-videomedia',
  templateUrl: './videomedia.component.html',
  styleUrls: ['./videomedia.component.scss']
})
export class VideomediaComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
