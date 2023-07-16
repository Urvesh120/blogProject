import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-shat-chandi',
  templateUrl: './shat-chandi.component.html',
  styleUrls: ['./shat-chandi.component.scss']
})
export class ShatChandiComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
