import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Product } from '../models/product';
import { ProductAddPage } from '../product-add/product-add.page';
import { ProductService } from '../services/product.service';
import { UpdateProductsPage } from '../product-update/update-products.page';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit {

  searchString="";
  products:Product[] = []
  constructor(
    private modalController:ModalController,
    private productService:ProductService,
    private menu:MenuController
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(doc=>{
      doc.forEach(d=>this.products.push(Object.assign({id:d.id},d.data())));
    })
  }

  dismiss(){
    this.modalController.dismiss();
  }
  async showAddProductModal(){
    const modal = await this.modalController.create({
      component:ProductAddPage
    })
    return await modal.present();
  }
  async showUpdateModal(product:Product){
    const modal = await this.modalController.create({
      component:UpdateProductsPage,
      componentProps:{product:product}
    });
    return await modal.present();
  }

  checkStock(product:Product){
    if(product.stock<=0){
      return "text-danger"
    }else if(product.stock==1){
      return "text-warning"
    }else if(product.stock>1){
      return "text-primary"
    }
    return "";
  }

}
