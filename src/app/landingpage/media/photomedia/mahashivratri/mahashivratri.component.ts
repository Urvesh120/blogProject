import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mahashivratri',
  templateUrl: './mahashivratri.component.html',
  styleUrls: ['./mahashivratri.component.scss']
})
export class MahashivratriComponent implements OnInit {

  image = '';
  photo_mahashivratri_one = 'assets/photo-galary/mahashivratri/mahashivratri_parv_1.png';
  photo_mahashivratri_two = 'assets/photo-galary/mahashivratri/mahashivratri_parv_2.png';
  photo_mahashivratri_three = 'assets/photo-galary/mahashivratri/mahashivratri_parv_3.png';
  photo_mahashivratri_four = 'assets/photo-galary/mahashivratri/mahashivratri_parv_4.png';
  photo_mahashivratri_five = 'assets/photo-galary/mahashivratri/mahashivratri_parv_5.png';
  photo_mahashivratri_six = 'assets/photo-galary/mahashivratri/mahashivratri_parv_6.png';


  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(value: any){
    switch(value){
      case 'one':
        this.image = this.photo_mahashivratri_one;
        break;
      case 'two':
        this.image = this.photo_mahashivratri_two;
        break;
      case 'three':
        this.image = this.photo_mahashivratri_three;
        break;
      case 'four':
        this.image = this.photo_mahashivratri_four;
        break;
      case 'five':
        this.image = this.photo_mahashivratri_five;
        break;
      case 'six':
        this.image = this.photo_mahashivratri_six;
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
