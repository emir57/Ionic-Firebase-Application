import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private fireStore: AngularFirestore
  ) { }

  addToCart(cart: Cart) {
    const carts = this.fireStore.collection("carts");
    return carts.add(cart);
  }

  deleteCart(id: string) {
    const carts = this.fireStore.collection("carts")
    this.getCart(id).subscribe(cart => {
      if (cart.quantity > 1) {
        cart.quantity -= 1
        carts.doc(id).update(cart);
      } else {
        carts.doc(id).delete();
      }
    })
  }
  getCart(id: string): Observable<any> {
    const subject = new Subject<any>();
    const carts = this.fireStore.collection("carts")
    carts.doc(id).get().subscribe(doc => {
      subject.next(Object.assign({ id: doc.id }, doc.data()))
    })
    return subject.asObservable();
  }
  getCarts() {
    let carts:any[]=[];
    const subject = new Subject<any>();
    const cart = this.fireStore.collection("carts")
    cart.get().subscribe(doc => {
      doc.forEach(d=>carts.push(Object.assign({id:d.id},d.data())))
      subject.next(carts)
    })
    return subject.asObservable();
  }
}
