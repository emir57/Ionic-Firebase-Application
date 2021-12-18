import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CartModel } from '../models/cartModel';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  @Input() carts:CartModel[]

  totalPrice=0;
  form:FormGroup
  constructor(
    private modalController:ModalController,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.carts.forEach(c=>{
      if(c.product.isDiscount){
        this.totalPrice += (c.product.unitPrice - (c.product.unitPrice*c.product.discount/100))*c.quantity
      }else{
        this.totalPrice += (c.product.unitPrice)*c.quantity
      }
    })
    this.createForm();
    console.log(this.totalPrice)
  }

  createForm(){
    this.form = this.formBuilder.group({
      creditCardNumber:['',[Validators.required,Validators.maxLength(16)]],
      cvv:['',[Validators.required,Validators.maxLength(3)]],
      date:['',[Validators.required]],
      city:['',[Validators.required]],
      addressText:['',[Validators.required]],
      totalPrice:[this.totalPrice]
    })
  }

  dismiss(){
    this.modalController.dismiss();
  }

}
