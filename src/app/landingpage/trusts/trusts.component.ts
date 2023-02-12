import { Component, OnInit } from '@angular/core';
import { PaymentComponent } from './payment/payment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-trusts',
  templateUrl: './trusts.component.html',
  styleUrls: ['./trusts.component.scss']
})
export class TrustsComponent implements OnInit {

  currentPage = 1;
  image1Path  = "../../../assets/images/imageSlider1.jpeg";

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  changePage(index: number): void {
    if(index == 1 && this.currentPage == 3){
      this.currentPage = 0;
    }
    if(index == -1 && this.currentPage == 1){
      this.currentPage = 3;
    }
    this.currentPage += index;
  }

  openDialog(){  
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '500px',
      height : '350px'
    });
  }
}
