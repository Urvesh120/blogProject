import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-nearestplaces',
  templateUrl: './nearestplaces.component.html',
  styleUrls: ['./nearestplaces.component.scss']
})
export class NearestplacesComponent implements OnInit {

  //images
  statueofUnity = 'assets/nearest-places/Statue-Of-Unity.jpg.svg';

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
