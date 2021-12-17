import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  collection = this.firebaseStore.collection("products");
  constructor(
    private firebaseStore:AngularFirestore,

  ) { }

  getProducts():any{
    const products = this.collection
    return products.get()
  }
  addProduct(product:Product){
    const products = this.collection
    return products.add(product);
  }
  getProduct(id:string):any{
    const product = this.collection.doc(id);
    return product.get();
  }
  updateProduct(product:Product){
    const products = this.collection
    return products.doc(product.id).update(product)
  }
  deleteProduct(id:string){
    const products = this.collection
    return products.doc(id).delete();
  }
}
