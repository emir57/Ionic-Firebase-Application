import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["lolemir060@hotmail.com", [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    })
  }
  login() {
    if (this.loginForm.valid) {
      let isSuccess = true;
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel)
        .catch(error => {
          isSuccess = false;
          this.presentToast(this.authService.setErrorMessage(error));
        }).finally(async () => {
          if (isSuccess) {
            this.authService.setRememberMe(loginModel)
            setTimeout(() => {
              this.authService.isLogin = true;
              this.presentToast("Giriş Başarılı")
              this.router.navigate(["home"])
            }, 1000);

          }
        })
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  resetPassword() {
    this.presentAlertPrompt();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Şifremi Sıfırla',
      inputs: [
        {
          name: 'email',
          type: 'email',
          attributes: { required: false },
          placeholder: 'name@example.com'
        },
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Gönder',
          handler: (value) => {
            let check = true;
            this.authService.resetPassword(value.email)
              .catch(error => {
                check = false;
                console.log(error)
                this.presentToast(this.authService.setErrorMessage(error))
              }).finally(() => {
                if (check) {
                  this.presentToast("Başarıyla şifre sıfırlama isteği gönderildi.Spam kutusunu kontrol etmeyi unutmayınız.")
                } else {
                  this.presentToast("Bir hata oluştu");
                }
              })
          }
        }
      ]
    });

    await alert.present();
  }




}
