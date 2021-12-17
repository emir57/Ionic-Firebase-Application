import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.page.html',
  styleUrls: ['./category-update.page.scss'],
})
export class CategoryUpdatePage implements OnInit {
  @Input() category:Category
  categoryUpdateForm:FormGroup
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.createcategoryUpdateForm();
  }


  createcategoryUpdateForm(){
    this.categoryUpdateForm = this.formBuilder.group({
      id:[this.category.id],
      name:[this.category.name,[Validators.required,Validators.maxLength(20)]]
    })
  }

  saveCategory(){
    if(this.categoryUpdateForm.valid){
      let category = Object.assign({},this.categoryUpdateForm.value);
      this.categoryService.updateCategory(category)
      .then(()=>{

      }).finally(()=>{
        window.location.reload();
      })
      this.presentToast(`güncelleme başarılı`)
      this.modalController.dismiss();
    }
  }

  dismiss(){
    this.modalController.dismiss();
  }

  deleteProduct(){
    this.categoryService.deleteCategory(this.category.id)
      .then(()=>{
      }).finally(()=>{
        this.presentToast(`${this.category.name} silme başarılı`)
        this.modalController.dismiss();
        window.location.reload();
      })
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Silme İşlemi',
      message: `'${this.category.name}' kategorisini silmek istediğinizden emin misiniz?`,
      buttons: [
        {
          text: 'İPTAL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'SİL',
          cssClass:"danger",
          handler: () => {
            this.categoryService.deleteCategory(this.category.id)
          }
        }
      ]
    });

    await alert.present();
  }
}
