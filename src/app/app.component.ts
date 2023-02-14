import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading$ = this.loader.loading$;
  showMessage !: boolean;
  
  constructor(public loader: LoaderService, private util : UtilService){
  }

  ngOnInit(){
  }
}
