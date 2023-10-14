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
  photo_shavan_mass_one = 'assets/photo-galary/shravan-maash/shravan_maash_1.png';
  photo_shavan_mass_two = 'assets/photo-galary/shravan-maash/shravan_maash_2.png';
  photo_shavan_mass_three = 'assets/photo-galary/shravan-maash/shravan_maash_3.png';
  photo_shavan_mass_four = 'assets/photo-galary/shravan-maash/shravan_maash_4.png';
  photo_shavan_mass_five = 'assets/photo-galary/shravan-maash/shravan_maash_5.png';
  photo_shavan_mass_six = 'assets/photo-galary/shravan-maash/shravan_maash_6.png';
  photo_shavan_mass_seven = 'assets/photo-galary/shravan-maash/shravan_maash_7.png';

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
      case 'seven':
        this.image = this.photo_shavan_mass_seven;
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
