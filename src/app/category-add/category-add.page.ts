import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {

  categoryAddForm:FormGroup
  constructor(
    private modalController:ModalController,
    private formBuilder:FormBuilder,
    private categoryService:CategoryService,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    this.createcategoryAddForm();
  }
  createcategoryAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.maxLength(20)]]
    })
  }
  saveCategory(){
    if(this.categoryAddForm.valid){
      let category = Object.assign({},this.categoryAddForm.value);
      this.categoryService.addCategory(category)
        .then(()=>{

        }).finally(()=>{
          window.location.reload();
        })
      this.presentToast(`${category.name} Başarıyla Kaydedildi`)
      this.modalController.dismiss();
    }
  }

  dismiss(){
    this.modalController.dismiss();
  }
  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
