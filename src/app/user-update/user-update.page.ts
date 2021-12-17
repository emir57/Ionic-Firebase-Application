import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {
  @Input() user: User

  userUpdateForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private toastController: ToastController,
    private userService: UserService,
    private alertController: AlertController,
    private router:Router
  ) { }

  ngOnInit() {
    this.createuserUpdateForm();
  }

  createuserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.user.id],
      email: [this.user.email, [Validators.required, Validators.email]],
      firstName: [this.user.firstName, [Validators.required, Validators.maxLength(20)]],
      lastName: [this.user.lastName, [Validators.required, Validators.maxLength(20)]],
      password: [this.user.password, [Validators.required]],
      roles: [this.user.roles, []],
    })
  }
  saveUser() {
    if (this.userUpdateForm.valid) {
      let user = Object.assign({}, this.userUpdateForm.value);
      this.userService.updateUser(user).finally(() => {
        window.location.reload();
      })
      this.presentToast(`${user.firstName} ${user.lastName} başarıyla güncellendi`)
      this.modalController.dismiss();
    }
  }
  deleteUser() {
    this.presentAlertConfirm();
  }

  dismiss() {
    this.modalController.dismiss();
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
      message: `'${this.user.firstName} ${this.user.lastName}' kullanıcısını silmek istediğinizden emin misiniz?`,
      buttons: [
        {
          text: 'İPTAL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'SİL',
          cssClass: "danger",
          handler: () => {
            this.userService.deleteUser(this.user.id).finally(() => {
              this.modalController.dismiss();
              this.presentToast("Başarıyla silindi");
              window.location.reload();
            })
          }
        }
      ]
    });
    await alert.present();
  }
}
