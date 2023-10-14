import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maharudra',
  templateUrl: './maharudra.component.html',
  styleUrls: ['./maharudra.component.scss']
})
export class MaharudraComponent implements OnInit {

  image = '';
  photo_maharudra_one = 'assets/photo-galary/Maharudra/maharudra_1.png';
  photo_maharudra_two = 'assets/photo-galary/Maharudra/maharudra_2.png';
  photo_maharudra_three = 'assets/photo-galary/Maharudra/maharudra_3.png';
  photo_maharudra_four = 'assets/photo-galary/Maharudra/maharudra_4.png';
  photo_maharudra_five = 'assets/photo-galary/Maharudra/maharudra_5.png';
  photo_maharudra_six = 'assets/photo-galary/Maharudra/maharudra_6.png';

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(value: any){
    switch(value){
      case 'one':
        this.image = this.photo_maharudra_one;
        break;
      case 'two':
        this.image = this.photo_maharudra_two;
        break;
      case 'three':
        this.image = this.photo_maharudra_three;
        break;
      case 'four':
        this.image = this.photo_maharudra_four;
        break;
      case 'five':
        this.image = this.photo_maharudra_five;
        break;
      case 'six':
        this.image = this.photo_maharudra_six;
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
