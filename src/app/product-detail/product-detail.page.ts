import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Cart } from '../models/cart';
import { CommentModel } from '../models/commentModel';
import { Product } from '../models/product';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CommentService } from '../services/comment.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  @Input() product:Product

  form:FormGroup
  currentUser:User
  comments:CommentModel[]=[]
  constructor(
    private modalController:ModalController,
    private productService:ProductService,
    private cartService:CartService,
    private authService:AuthService,
    private toastController:ToastController,
    private formBuilder:FormBuilder,
    private commentService:CommentService,
    private router:Router
  ) { }

  ngOnInit() {
    this.currentUser=this.authService.getUserInStorage();
    this.createForm();
    this.commentService.getCommentsByProductId(this.product.id).subscribe(comments=>{
      comments.forEach(c=>{
        this.authService.getuser(c.userEmail).subscribe(user=>{
          this.comments.push(Object.assign({user:user},c))
        })
      })
    })
  }

  dismiss(){
    this.modalController.dismiss();
  }

  addToCart(){
    let cart:Cart={
      productId:this.product.id,
      userId:this.currentUser.id,
      quantity:0,
    }
    this.cartService.addToCart(cart)
    this.presentToast("Sepete Yönlendiriliyorsunuz.")
    setTimeout(() => {
      this.router.navigate(["my-carts"])
      this.modalController.dismiss();
    }, 1000);
  }
  createForm(){
    this.form = this.formBuilder.group({
      productId:[this.product.id,[]],
      userEmail:[this.currentUser.email,[]],
      message:['',[Validators.required]],
      isLike:[false,[]]
    })
  }


  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  commentDo(){
    if(this.form.valid){
      this.commentService.commentDo(this.form.value).finally(()=>{
        this.presentToast("Başarıyla Değerlendi Teşekkür Ederiz");
      })
    }
  }
}
