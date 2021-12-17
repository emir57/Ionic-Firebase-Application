import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductAddPage } from './product-add/product-add.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public modalController:ModalController
  ) {}
}
