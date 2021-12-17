import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    public modalController: ModalController,
    private authService: AuthService,
    private router: Router
  ) {
    let sessionUser = sessionStorage.getItem("user")
    let localUser = localStorage.getItem("user")
    if (localUser) {
      this.authService.isLogin = true;
      this.router.navigate(["home"])
    }
    else if (sessionUser) {
      this.authService.isLogin = true;
      this.router.navigate(["home"])
    }
  }
}
