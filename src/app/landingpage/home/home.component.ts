import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showDescription1 : boolean = false;
  showDescription2 : boolean = false;
  image1Path  = "../../../assets/images/home_mahadev_portrait.jpg";
  image2Path  = "../../../assets/images/home_navdurga_portrait.jpg";
  image3Path  = "../../../assets/images/Rang-Avadhot-1.jpg";

  @ViewChild('scrollingText') scrollingText!: ElementRef;

  constructor(private viewportScroller: ViewportScroller, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
    const scrollingText = this.scrollingText.nativeElement;
    const clone = scrollingText.cloneNode(true);
    this.renderer.appendChild(scrollingText.parentNode, clone);

    const scrollAmount = 2;
    setInterval(() => {
      const currentPosition = scrollingText.scrollLeft;
      scrollingText.scrollLeft += scrollAmount;

      if (currentPosition === scrollingText.scrollLeft) {
        scrollingText.scrollLeft = 0;
      }
    }, 10);
  }

  description1(){
    this.showDescription1 = !this.showDescription1;
  }

  description2(){
    this.showDescription2 = !this.showDescription2;
  }
}
