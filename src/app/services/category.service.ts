import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  collection = this.fireStore.collection("categories");
  constructor(
    private fireStore:AngularFirestore
  ) { }

  getCategories():any{
    const categories = this.collection;
    return categories.get();
  }
  addCategory(categoryModel:Category){
    const categories = this.collection;
    return categories.add(categoryModel)
  }
  updateCategory(categoryModel:Category){
    const categories = this.collection;
    return categories.doc(categoryModel.id).update(categoryModel);
  }
  deleteCategory(id:string){
    const categories = this.collection;
    return categories.doc(id).delete();
  }
}
