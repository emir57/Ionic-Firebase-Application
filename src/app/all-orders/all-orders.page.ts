import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { ProductDetailPage } from '../product-detail/product-detail.page';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { UserUpdatePage } from '../user-update/user-update.page';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.page.html',
  styleUrls: ['./all-orders.page.scss'],
})
export class AllOrdersPage implements OnInit {

  orders:Order[]=[]
  constructor(
    private orderService:OrderService,
    private modalController:ModalController,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe(orders=>{
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

  async showUserModal(userEmail:string){
    this.authService.getuser(userEmail)
    //todos
    const modal = await this.modalController.create({
      component:UserUpdatePage,
      componentProps:{user:userEmail}
    });
    return await modal.present();
  }

}
