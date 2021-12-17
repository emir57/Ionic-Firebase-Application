import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})
export class UserAddPage implements OnInit {

  userAddForm:FormGroup
  constructor(
    private userService:UserService
  ) { }

  ngOnInit() {
  }

}
