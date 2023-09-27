import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shardotsav',
  templateUrl: './shardotsav.component.html',
  styleUrls: ['./shardotsav.component.scss']
})
export class ShardotsavComponent implements OnInit {

  image = '';
  photo_shardotsav_one = 'assets/photo-galary/shardotshav/1_O.jpg';
  photo_shardotsav_two = 'assets/photo-galary/shardotshav/2_O.jpg';
  photo_shardotsav_three = 'assets/photo-galary/shardotshav/3_O.jpg';
  photo_shardotsav_four = 'assets/photo-galary/shardotshav/4_O.jpg';
  photo_shardotsav_five = 'assets/photo-galary/shardotshav/5_O.jpg';
  photo_shardotsav_six = 'assets/photo-galary/shardotshav/6_O.jpg';

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  imagePreview(value: any){
    switch(value){
      case 'one':
        this.image = this.photo_shardotsav_one;
        break;
      case 'two':
        this.image = this.photo_shardotsav_two;
        break;
      case 'three':
        this.image = this.photo_shardotsav_three;
        break;
      case 'four':
        this.image = this.photo_shardotsav_four;
        break;
      case 'five':
        this.image = this.photo_shardotsav_five;
        break;
      case 'six':
        this.image = this.photo_shardotsav_six;
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
