import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      rememberMe:[false]
    })
  }
  login(){
    if(this.loginForm.valid){
      let isSuccess=true;
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel)
        .catch(error=>{
          isSuccess=false;
          this.presentToast(this.authService.setErrorMessage(error));
        }).finally(()=>{
          if(isSuccess){
            this.authService.setRememberMe(loginModel)
            this.presentToast("Giriş Başarılı")
            this.router.navigate(["/home"])
          }
        })
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
