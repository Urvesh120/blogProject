import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {

  colorControl!: FormControl;
  donationFormGroup: any;
  isNandikeshwarMahadevTrustRadioButtonSelected = true;

  constructor(private fb: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.donationFormGroup = this.fb.group({
      trustRadioButton: ['nandikeshwarMahadevTrust', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  changeRadioButton(event : any){
    if(event.target.value == 'nandikeshwarMahadevTrust'){
      this.isNandikeshwarMahadevTrustRadioButtonSelected = true;
    }
    if(event.target.value == 'nandikeshwarCheritableTrust'){
      this.isNandikeshwarMahadevTrustRadioButtonSelected = false;
    }
  }

}
