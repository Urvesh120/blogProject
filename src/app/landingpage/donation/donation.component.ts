import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import * as convert from 'xml-js';
import axios from 'axios';

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
    this.onSubmit();
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

  onSubmit(){
      const merchantId = 2645714;
      const orderId = 1;
      const amount = 10;
      const currency = 'INR';
      const redirectUrl = 'https://www.google.com/';
  
      const workingKey = 'EC0A77F0FDDBAC6A95A75DEC1FDBD385'; // Obtained from CCAvenue
      const accessCode = 'AVBN86KG87AU97NBUA'; // Obtained from CCAvenue
  
      const data = `${merchantId}|${orderId}|${amount}|${redirectUrl}|${workingKey}`;
  
      const encryptedData = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
      const request = {
        'merchant_id': merchantId,
        'order_id': orderId,
        'amount': amount,
        'currency': currency,
        'redirect_url': redirectUrl,
        'cancel_url': redirectUrl,
        'language': 'EN',
        'billing_name': 'CUSTOMER_NAME',
        'billing_address': 'CUSTOMER_ADDRESS',
        'billing_city': 'CUSTOMER_CITY',
        'billing_state': 'CUSTOMER_STATE',
        'billing_zip': 'CUSTOMER_ZIP',
        'billing_country': 'CUSTOMER_COUNTRY',
        'billing_tel': 'CUSTOMER_PHONE',
        'billing_email': 'CUSTOMER_EMAIL',
        'delivery_name': 'CUSTOMER_NAME',
        'delivery_address': 'CUSTOMER_ADDRESS',
        'delivery_city': 'CUSTOMER_CITY',
        'delivery_state': 'CUSTOMER_STATE',
        'delivery_zip': 'CUSTOMER_ZIP',
        'delivery_country': 'CUSTOMER_COUNTRY',
        'delivery_tel': 'CUSTOMER_PHONE',
        'merchant_param1': '',
        'merchant_param2': '',
        'merchant_param3': '',
        'merchant_param4': '',
        'merchant_param5': '',
        'promo_code': '',
        'customer_identifier': '',
        'encRequest': encryptedData,
        'access_code': accessCode
      };
  
      const xmlRequest = convert.js2xml(request, { compact: true });
  
      axios.post('https://test.ccavenue.com/transaction/initiateTransaction', xmlRequest, {
        headers: {
          'Content-Type': 'application/xml'
        }
      }).then(response => {
        const result = convert.xml2js(response.data, { compact: true }) ;
        // const redirectUrl = result.AvenueResponse?.redirect_url._text;
        // Redirect the user to the redirectUrl
        // window.location.href = redirectUrl;
      }).catch(error => {
        console.log(error);
      });
  }
}
