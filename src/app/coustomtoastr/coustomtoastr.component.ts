import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { UtilService } from '../services/util.service';
import { messages } from '../shared/enum';
@Component({
  selector: 'app-coustomtoastr',
  templateUrl: './coustomtoastr.component.html',
  styleUrls: ['./coustomtoastr.component.scss']
})
export class CoustomtoastrComponent implements OnInit {

  image = 'assets/illustators/Register.svg';
  message = this.util.getMessage().subscribe();
  type = this.util.getMessageType();
  constructor(private loader : LoaderService, private util : UtilService) { }

  ngOnInit(): void {
    debugger
    console.log(this.message);
    console.log(this.type);
  }

  clossDiv(){
    this.loader.hide();
  }

}
