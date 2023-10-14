import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shravaniparv',
  templateUrl: './shravaniparv.component.html',
  styleUrls: ['./shravaniparv.component.scss']
})
export class ShravaniparvComponent implements OnInit {

  image = '';
  photo_shravaniparv_one = 'assets/photo-galary/shravniparv/shravni_parva_1.png';
  photo_shravaniparv_two = 'assets/photo-galary/shravniparv/shravni_parva_2.png';
  photo_shravaniparv_three = 'assets/photo-galary/shravniparv/shravni_parva_3.png';
  photo_shravaniparv_four = 'assets/photo-galary/shravniparv/shravni_parva_4.png';
  photo_shravaniparv_five = 'assets/photo-galary/shravniparv/shravni_parva_5.png';
  photo_shravaniparv_six = 'assets/photo-galary/shravniparv/shravni_parva_6.png';

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(value: any){
    switch(value){
      case 'one':
        this.image = this.photo_shravaniparv_one;
        break;
      case 'two':
        this.image = this.photo_shravaniparv_two;
        break;
      case 'three':
        this.image = this.photo_shravaniparv_three;
        break;
      case 'four':
        this.image = this.photo_shravaniparv_four;
        break;
      case 'five':
        this.image = this.photo_shravaniparv_five;
        break;
      case 'six':
        this.image = this.photo_shravaniparv_six;
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
