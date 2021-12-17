import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserAddPage } from '../user-add/user-add.page';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.page.html',
  styleUrls: ['./all-users.page.scss'],
})
export class AllUsersPage implements OnInit {

  users:User[]=[]
  searchString="";
  constructor(
    private authService:AuthService,
    private modalController:ModalController
  ) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(users=>{
      this.users = users;
    })
  }

  async showAddUserModal(){
    const modal = await this.modalController.create({
      component:UserAddPage
    })
    return await modal.present();
  }

  async showUpdateModal(user:User){

  }

}
