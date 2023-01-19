import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  options : any = [
    'option 1',
    'option 2',
    'option 3',
    'option 4',
    'option 5' 
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
