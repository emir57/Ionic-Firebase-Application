import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.page.html',
  styleUrls: ['./update-products.page.scss'],
})
export class UpdateProductsPage implements OnInit {
  @Input() product: Product;
  productUpdateForm: FormGroup;
  categories: Category[] = []
  constructor(
    private modalController: ModalController,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.getCategories();
    this.createproductUpdateForm();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(doc => {
      doc.forEach(d => this.categories.push(Object.assign({ id: d.id }, d.data())))
    })
  }
  createproductUpdateForm() {
    this.productUpdateForm = this.formBuilder.group({
      id: [this.product.id],
      productName: [this.product.productName, [Validators.required]],
      description: [this.product.description, []],
      categoryId: [this.product.categoryId, [Validators.required, Validators.min(1)]],
      imageUrl: [this.product.imageUrl, []],
      unitPrice: [this.product.unitPrice, [Validators.required, Validators.min(1)]],
      stock: [this.product.stock, [Validators.required, Validators.min(1)]],
      discount: [this.product.discount, []],
      isDiscount: [this.product.isDiscount, []],
    })
  }

  dismiss() {
    this.modalController.dismiss();
  }
  deleteProduct() {
    this.presentAlertConfirm();
  }
  updateProduct() {
    if (this.productUpdateForm.valid) {
      let updatedProduct = Object.assign({}, this.productUpdateForm.value);
      this.productService.updateProduct(updatedProduct)
        .then(() => {
        }).finally(() => {
          window.location.reload();
        })
      this.presentToast(`${updatedProduct.productName} başarıyla güncellendi`)
      this.modalController.dismiss();
    }
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
      message: `'${this.product.productName}' ürününü silmek istediğinizden emin misiniz?`,
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
            this.productService.deleteProduct(this.product.id);
          }
        }
      ]
    });

    await alert.present();
  }
}
