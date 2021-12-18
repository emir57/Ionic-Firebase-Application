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
    let isUpdate = false;
    this.getCarts().subscribe(carts => {
      carts.forEach(c => {
        if (cart.productId == c.productId && cart.userId == c.userId) {
          c.quantity++;
          isUpdate = true
          this.updateCart(c).catch(error=>console.log(error))
        }
      })
      if (!isUpdate) {
        console.log("a")
        const cartdatabase = this.fireStore.collection("carts");
        cart.quantity += 1;
        cartdatabase.add(cart)
      }
    })

  }
  deleteCart(id: string) {
    const carts = this.fireStore.collection("carts")
    this.getCart(id).subscribe(cart => {
      if (cart.quantity > 1) {
        cart.quantity -= 1
        this.updateCart(cart);
      } else {
        carts.doc(id).delete();
      }
    })
  }
  deleteCartAll(id: string) {
    const carts = this.fireStore.collection("carts")
    carts.doc(id).delete();
  }
  getCart(id: string): Observable<any> {
    const subject = new Subject<any>();
    const carts = this.fireStore.collection("carts")
    carts.doc(id).get().subscribe(doc => {
      subject.next(Object.assign({ id: doc.id }, doc.data()))
    })
    return subject.asObservable();
  }
  getCartsByUserId(userId: string): Observable<any> {
    let carts: Cart[] = []
    const subject = new Subject<any>();
    this.getCarts().subscribe(getCarts => {
      getCarts.forEach(c => {
        if (c.userId == userId) {
          carts.push(c)
        }
      })
      subject.next(carts);
    })
    return subject.asObservable();
  }
  getCarts() {
    let carts: any[] = [];
    const subject = new Subject<any>();
    const cart = this.fireStore.collection("carts")
    cart.get().subscribe(doc => {
      doc.forEach(d => carts.push(Object.assign({ id: d.id }, d.data())))
      subject.next(carts)
    })
    return subject.asObservable();
  }
  private updateCart(cart: Cart) {
    const carts = this.fireStore.collection("carts")
    return carts.doc(cart.id).update(cart);
  }
}
