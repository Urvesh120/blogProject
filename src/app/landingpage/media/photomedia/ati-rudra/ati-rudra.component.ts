import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ati-rudra',
  templateUrl: './ati-rudra.component.html',
  styleUrls: ['./ati-rudra.component.scss']
})
export class AtiRudraComponent implements OnInit, AfterViewInit {

  image = '';
  photo_ati_rudra_one = 'assets/photo-galary/ati-rudra/1_O.jpg';
  photo_ati_rudra_two = 'assets/photo-galary/ati-rudra/2_O.jpg';
  photo_ati_rudra_three = 'assets/photo-galary/ati-rudra/3_O.jpg';
  photo_ati_rudra_four = 'assets/photo-galary/ati-rudra/4_O.jpg';
  photo_ati_rudra_five = 'assets/photo-galary/ati-rudra/5_O.jpg';
  photo_ati_rudra_six = 'assets/photo-galary/ati-rudra/6_O.jpg';

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(value: any){
    switch(value){
      case 'one':
        this.image = this.photo_ati_rudra_one;
        break;
      case 'two':
        this.image = this.photo_ati_rudra_two;
        break;
      case 'three':
        this.image = this.photo_ati_rudra_three;
        break;
      case 'four':
        this.image = this.photo_ati_rudra_four;
        break;
      case 'five':
        this.image = this.photo_ati_rudra_five;
        break;
      case 'six':
        this.image = this.photo_ati_rudra_six;
        break;
    }
    this.sweetAlertPreview();
  }

  sweetAlertPreview(){
    Swal.fire({
      imageUrl: this.image,
      showCloseButton: true,
      focusConfirm: false,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    })
  }
}
