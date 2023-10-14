import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nandikeshwarmahadev',
  templateUrl: './nandikeshwarmahadev.component.html',
  styleUrls: ['./nandikeshwarmahadev.component.scss']
})
export class NandikeshwarmahadevComponent implements OnInit {

  imageLink = "assets/trust-mandal/SHREE NANDIKESHWAR MAHADEV TRUST.png";

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(){
    Swal.fire({
      imageUrl: this.imageLink,
      showCloseButton: true,
      focusConfirm: false,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    })
  }

}
