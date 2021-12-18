import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { User } from '../models/user';
import { ProductDetailPage } from '../product-detail/product-detail.page';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  currentUser:User
  orders:Order[]=[]
  constructor(
    private orderService:OrderService,
    private authService:AuthService,
    private modalController:ModalController
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUserInStorage();
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrdersByUserId(this.currentUser.id).subscribe(orders=>{
      this.orders = orders;
    })
  }

  async showProductModal(product:Product){
    const modal = await this.modalController.create({
      component:ProductDetailPage,
      componentProps:{product:product}
    });
    return await modal.present();
  }
}
