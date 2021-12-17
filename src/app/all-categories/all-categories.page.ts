import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { CategoryAddPage } from '../category-add/category-add.page';
import { CategoryUpdatePage } from '../category-update/category-update.page';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.page.html',
  styleUrls: ['./all-categories.page.scss'],
})
export class AllCategoriesPage implements OnInit {

  searchString='';
  categories:Category[]=[]
  constructor(
    private modalController:ModalController,
    private categoryService:CategoryService
  ) { }

  ngOnInit() {
    this.getCategories().subscribe((categories)=>this.categories=categories)
  }

  getCategories():Observable<any>{
    let categories :Category[]=[]
    const subject = new Subject<any>();
    this.categoryService.getCategories().subscribe(doc=>{
      doc.forEach(d=>categories.push(Object.assign({id:d.id},d.data())));
      subject.next(categories);
    })
    return subject.asObservable();
  }

  async showAddCategoryModal(){
    const modal = await this.modalController.create({
      component:CategoryAddPage
    })
    return await modal.present();
  }
  async showUpdateModal(category:Category){
    const modal = await this.modalController.create({
      component:CategoryUpdatePage,
      componentProps:{category:category}
    })
    return await modal.present();
  }

  dismiss(){
    this.modalController.dismiss();
  }

}
