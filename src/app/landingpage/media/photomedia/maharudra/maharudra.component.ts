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
  photo_maharudra_one = 'assets/photo-galary/Maharudra/1_O.jpg';
  photo_maharudra_two = 'assets/photo-galary/Maharudra/2_O.jpg';
  photo_maharudra_three = 'assets/photo-galary/Maharudra/3_O.jpg';
  photo_maharudra_four = 'assets/photo-galary/Maharudra/4_O.jpg';
  photo_maharudra_five = 'assets/photo-galary/Maharudra/5_O.jpg';
  photo_maharudra_six = 'assets/photo-galary/Maharudra/6_O.jpg';

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
