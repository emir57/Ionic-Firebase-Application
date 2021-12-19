import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {

  productAddForm:FormGroup
  constructor(
    public modalController:ModalController,
    private formBuilder:FormBuilder,
    private productService:ProductService,
    private categoryService:CategoryService,
    private toastController:ToastController
  ) { }

  categories:Category[]=[]
  ngOnInit() {
    this.createproductAddForm();
    this.categoryService.getCategories().subscribe(doc=>{
      doc.forEach(d=>this.categories.push(Object.assign({id:d.id},d.data())))
    })

  }

  dismiss(){
    this.modalController.dismiss();
  }
  createproductAddForm(){
    this.productAddForm = this.formBuilder.group({
      productName:['',[Validators.required]],
      description:['',[]],
      categoryId:[0,[Validators.required,Validators.min(1)]],
      imageUrl:['../assets/',[]],
      unitPrice:['',[Validators.required,Validators.min(1)]],
      stock:['',[Validators.required,Validators.min(1)]],
      discount:['',[]],
      isDiscount:[false,[]],
    })
  }
  saveProduct(){
    if(this.productAddForm.valid){
      let product = Object.assign({},this.productAddForm.value);
      this.productService.addProduct(product)
        .then(()=>{

        }).finally(()=>{
          window.location.reload();
        })
      this.presentToast(`${product.productName} Başarıyla Kaydedildi`)
      this.modalController.dismiss();
    }
  }
  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
