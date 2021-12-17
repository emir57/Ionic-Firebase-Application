import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {
  @Input() user:User

  userUpdateForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private modalController:ModalController,
    private toastController:ToastController,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.createuserUpdateForm();
  }

  createuserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      id:[this.user.id],
      email: [this.user.email, [Validators.required, Validators.email]],
      firstName: [this.user.firstName, [Validators.required, Validators.maxLength(20)]],
      lastName: [this.user.lastName, [Validators.required, Validators.maxLength(20)]],
      password: [this.user.password, [Validators.required]],
      roles: [this.user.roles, []],
    })
  }
  saveUser(){
    if(this.userUpdateForm.valid){
      let user = Object.assign({},this.userUpdateForm.value);
      this.userService.updateUser(user).finally(()=>{
        window.location.reload();
      })
      this.presentToast(`${user.firstName} ${user.lastName} başarıyla güncellendi`)
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
