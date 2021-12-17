import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})
export class UserAddPage implements OnInit {

  userAddForm: FormGroup
  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.createuserAddForm();
  }

  createuserAddForm() {
    this.userAddForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required]],
      roles: ['', []],
    })
  }

  saveUser() {
    if (this.userAddForm.valid) {
      let user = Object.assign({}, this.userAddForm.value)
      this.authService.register(user)
      .finally(() => {

      })
      this.userService.addUser(user)
      .finally(() => {
          this.presentToast(`${user.firstName} ${user.lastName} Başarıyla Kaydedildi`)
      })
      this.modalController.dismiss();
      // window.location.reload();
    }
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

}
