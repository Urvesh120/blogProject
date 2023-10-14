import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shat-chandi',
  templateUrl: './shat-chandi.component.html',
  styleUrls: ['./shat-chandi.component.scss']
})
export class ShatChandiComponent implements OnInit {

  image = '';
  photo_shat_chandi_one = 'assets/photo-galary/shat-chnadi/shat_chandi_1.png';
  photo_shat_chandi_two = 'assets/photo-galary/shat-chnadi/shat_chandi_2.png';
  photo_shat_chandi_three = 'assets/photo-galary/shat-chnadi/shat_chandi_3.png';
  photo_shat_chandi_four = 'assets/photo-galary/shat-chnadi/shat_chandi_4.png';
  photo_shat_chandi_five = 'assets/photo-galary/shat-chnadi/shat_chandi_5.png';
  photo_shat_chandi_six = 'assets/photo-galary/shat-chnadi/shat_chandi_6.png';

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(value: any){
    switch(value){
      case 'one':
        this.image = this.photo_shat_chandi_one;
        break;
      case 'two':
        this.image = this.photo_shat_chandi_two;
        break;
      case 'three':
        this.image = this.photo_shat_chandi_three;
        break;
      case 'four':
        this.image = this.photo_shat_chandi_four;
        break;
      case 'five':
        this.image = this.photo_shat_chandi_five;
        break;
      case 'six':
        this.image = this.photo_shat_chandi_six;
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
