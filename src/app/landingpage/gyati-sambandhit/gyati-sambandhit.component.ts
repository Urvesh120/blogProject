import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-gyati-sambandhit',
  templateUrl: './gyati-sambandhit.component.html',
  styleUrls: ['./gyati-sambandhit.component.scss']
})
export class GyatiSambandhitComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
