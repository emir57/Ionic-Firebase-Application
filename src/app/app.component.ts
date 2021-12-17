import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductAddPage } from './product-add/product-add.page';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public modalController:ModalController,
    private authService:AuthService
  ) {
    if(this.authService.checkRemember()){
      let user =JSON.parse(localStorage.getItem("user"))
      this.authService.login(user)
    }
  }
}
