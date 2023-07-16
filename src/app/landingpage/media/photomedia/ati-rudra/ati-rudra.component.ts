import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-ati-rudra',
  templateUrl: './ati-rudra.component.html',
  styleUrls: ['./ati-rudra.component.scss']
})
export class AtiRudraComponent implements OnInit, AfterViewInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
