import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-vishnu-yaag',
  templateUrl: './vishnu-yaag.component.html',
  styleUrls: ['./vishnu-yaag.component.scss']
})
export class VishnuYaagComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
