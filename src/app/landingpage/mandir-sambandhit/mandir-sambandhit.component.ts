import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-mandir-sambandhit',
  templateUrl: './mandir-sambandhit.component.html',
  styleUrls: ['./mandir-sambandhit.component.scss']
})
export class MandirSambandhitComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
