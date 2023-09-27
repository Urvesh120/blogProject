import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datt-yaag',
  templateUrl: './datt-yaag.component.html',
  styleUrls: ['./datt-yaag.component.scss']
})
export class DattYaagComponent implements OnInit {

  image = '';
  photo_datt_yaad_one = 'assets/photo-galary/datt-yaag/1_O.jpg';
  photo_datt_yaad_two = 'assets/photo-galary/datt-yaag/2_O.jpg';
  photo_datt_yaad_three = 'assets/photo-galary/datt-yaag/3_O.jpg';
  photo_datt_yaad_four = 'assets/photo-galary/datt-yaag/4_O.jpg';
  photo_datt_yaad_five = 'assets/photo-galary/datt-yaag/5_O.jpg';
  photo_datt_yaad_six = 'assets/photo-galary/datt-yaag/6_O.jpg';

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(value: any){
    switch(value){
      case 'one':
        this.image = this.photo_datt_yaad_one;
        break;
      case 'two':
        this.image = this.photo_datt_yaad_two;
        break;
      case 'three':
        this.image = this.photo_datt_yaad_three;
        break;
      case 'four':
        this.image = this.photo_datt_yaad_four;
        break;
      case 'five':
        this.image = this.photo_datt_yaad_five;
        break;
      case 'six':
        this.image = this.photo_datt_yaad_six;
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
