import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sundar-kand',
  templateUrl: './sundar-kand.component.html',
  styleUrls: ['./sundar-kand.component.scss']
})
export class SundarKandComponent implements OnInit {

  image = '';
  photo_sundar_kand_one = 'assets/photo-galary/SundarKand/sundar_kand_1.png';
  photo_sundar_kand_two = 'assets/photo-galary/SundarKand/sundar_kand_2.png';
  photo_sundar_kand_three = 'assets/photo-galary/SundarKand/sundar_kand_3.png';
  photo_sundar_kand_four = 'assets/photo-galary/SundarKand/sundar_kand_4.png';
  photo_sundar_kand_five = 'assets/photo-galary/SundarKand/sundar_kand_5.png';
  photo_sundar_kand_six = 'assets/photo-galary/SundarKand/sundar_kand_6.png';

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(value: any){
    switch(value){
      case 'one':
        this.image = this.photo_sundar_kand_one;
        break;
      case 'two':
        this.image = this.photo_sundar_kand_two;
        break;
      case 'three':
        this.image = this.photo_sundar_kand_three;
        break;
      case 'four':
        this.image = this.photo_sundar_kand_four;
        break;
      case 'five':
        this.image = this.photo_sundar_kand_five;
        break;
      case 'six':
        this.image = this.photo_sundar_kand_six;
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
