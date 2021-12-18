import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Order } from '../models/order';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private fireStore:AngularFirestore,
    private productService:ProductService
  ) { }

  getOrders():Observable<any>{
    let returnOrders:any[]=[]
    let subject = new Subject<any>();
    const orders = this.fireStore.collection("orders").get().subscribe(doc=>{
      doc.forEach(d=>returnOrders.push(Object.assign({id:d.id},d.data())))
      subject.next(returnOrders);
    })
    return subject.asObservable();
  }

  getOrdersByUserId(id:string):Observable<any>{
    let returnOrders:any[]=[]
    let subject = new Subject<any>();
    const orders = this.fireStore.collection("orders").get().subscribe(doc=>{
      doc.forEach(d=>returnOrders.push(Object.assign({id:d.id},d.data())))
      subject.next(returnOrders.filter(x=>x.userId===id));
    })
    return subject.asObservable();
  }

  addOrder(order:Order){
    const orders = this.fireStore.collection("orders");
    return orders.add(order);
  }
}
