import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shavan-mass',
  templateUrl: './shavan-mass.component.html',
  styleUrls: ['./shavan-mass.component.scss']
})
export class ShavanMassComponent implements OnInit {

  image = '';
  photo_shavan_mass_one = 'assets/photo-galary/shravan-maash/1_O.jpg';
  photo_shavan_mass_two = 'assets/photo-galary/shravan-maash/2_O.jpg';
  photo_shavan_mass_three = 'assets/photo-galary/shravan-maash/3_O.jpg';
  photo_shavan_mass_four = 'assets/photo-galary/shravan-maash/4_O.jpg';
  photo_shavan_mass_five = 'assets/photo-galary/shravan-maash/5_O.jpg';
  photo_shavan_mass_six = 'assets/photo-galary/shravan-maash/6_O.jpg';

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(value: any){
    switch(value){
      case 'one':
        this.image = this.photo_shavan_mass_one;
        break;
      case 'two':
        this.image = this.photo_shavan_mass_two;
        break;
      case 'three':
        this.image = this.photo_shavan_mass_three;
        break;
      case 'four':
        this.image = this.photo_shavan_mass_four;
        break;
      case 'five':
        this.image = this.photo_shavan_mass_five;
        break;
      case 'six':
        this.image = this.photo_shavan_mass_six;
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
