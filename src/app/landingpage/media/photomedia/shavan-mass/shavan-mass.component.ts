import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-shavan-mass',
  templateUrl: './shavan-mass.component.html',
  styleUrls: ['./shavan-mass.component.scss']
})
export class ShavanMassComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
