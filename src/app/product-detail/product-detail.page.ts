import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  @Input() product:Product

  constructor(
    private modalController:ModalController,
    private productService:ProductService
  ) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }

}
