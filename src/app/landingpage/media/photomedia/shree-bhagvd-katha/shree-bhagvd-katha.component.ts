import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shree-bhagvd-katha',
  templateUrl: './shree-bhagvd-katha.component.html',
  styleUrls: ['./shree-bhagvd-katha.component.scss']
})
export class ShreeBhagvdKathaComponent implements OnInit {

  image = '';
  photo_shree_bhagvd_katha_one = 'assets/photo-galary/shree-bhagvad-katha/1_O.jpg';
  photo_shree_bhagvd_katha_two = 'assets/photo-galary/shree-bhagvad-katha/2_O.jpg';
  photo_shree_bhagvd_katha_three = 'assets/photo-galary/shree-bhagvad-katha/3_O.jpg';
  photo_shree_bhagvd_katha_four = 'assets/photo-galary/shree-bhagvad-katha/4_O.jpg';
  photo_shree_bhagvd_katha_five = 'assets/photo-galary/shree-bhagvad-katha/5_O.jpg';
  photo_shree_bhagvd_katha_six = 'assets/photo-galary/shree-bhagvad-katha/6_O.jpg';

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(value: any){
    switch(value){
      case 'one':
        this.image = this.photo_shree_bhagvd_katha_one;
        break;
      case 'two':
        this.image = this.photo_shree_bhagvd_katha_two;
        break;
      case 'three':
        this.image = this.photo_shree_bhagvd_katha_three;
        break;
      case 'four':
        this.image = this.photo_shree_bhagvd_katha_four;
        break;
      case 'five':
        this.image = this.photo_shree_bhagvd_katha_five;
        break;
      case 'six':
        this.image = this.photo_shree_bhagvd_katha_six;
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
