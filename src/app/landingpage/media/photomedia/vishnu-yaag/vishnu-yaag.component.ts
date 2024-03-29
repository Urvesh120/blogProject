import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vishnu-yaag',
  templateUrl: './vishnu-yaag.component.html',
  styleUrls: ['./vishnu-yaag.component.scss']
})
export class VishnuYaagComponent implements OnInit {

  image = '';
  photo_vishnu_yaag_one = 'assets/photo-galary/vishnu-yaag/vishu_yaag_1.png';
  photo_vishnu_yaag_two = 'assets/photo-galary/vishnu-yaag/vishu_yaag_2.png';
  photo_vishnu_yaag_three = 'assets/photo-galary/vishnu-yaag/vishu_yaag_3.png';
  photo_vishnu_yaag_four = 'assets/photo-galary/vishnu-yaag/vishu_yaag_4.png';
  photo_vishnu_yaag_five = 'assets/photo-galary/vishnu-yaag/vishu_yaag_5.png';
  photo_vishnu_yaag_six = 'assets/photo-galary/vishnu-yaag/vishu_yaag_6.png';

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(value: any){
    switch(value){
      case 'one':
        this.image = this.photo_vishnu_yaag_one;
        break;
      case 'two':
        this.image = this.photo_vishnu_yaag_two;
        break;
      case 'three':
        this.image = this.photo_vishnu_yaag_three;
        break;
      case 'four':
        this.image = this.photo_vishnu_yaag_four;
        break;
      case 'five':
        this.image = this.photo_vishnu_yaag_five;
        break;
      case 'six':
        this.image = this.photo_vishnu_yaag_six;
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
