import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  shippingAddrrss: FormGroup;
  billingAddress: FormGroup;
  creditCard: FormGroup;
  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.checkoutFormGroup = this._formBuilder.group({
      customer: this._formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this._formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
  
      }),
      billingAddress: this._formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
  
      }),
      creditCard: this._formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        cvv: [''],
        expirationMonth: [''],
        expirationYear: ['']
  
  
      })
  


    })
  
  }

  onSubmit() {
    console.log('purchasing  books');
    console.log("Customer Data :" + this.checkoutFormGroup.get('customer').value);
    console.log("Customer Email:" + this.checkoutFormGroup.get('customer').value.email);
  }
  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }

  }

}
