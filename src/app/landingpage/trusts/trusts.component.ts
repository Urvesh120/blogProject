import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trusts',
  templateUrl: './trusts.component.html',
  styleUrls: ['./trusts.component.scss']
})
export class TrustsComponent implements OnInit {

  currentPage = 1;

  constructor() { }

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

}
