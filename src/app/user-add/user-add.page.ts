import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})
export class UserAddPage implements OnInit {

  userAddForm:FormGroup
  constructor(
    private userService:UserService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.createuserAddForm();
  }

  createuserAddForm(){
    this.userAddForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      firstName:['',[Validators.required,Validators.maxLength(20)]],
      lastName:['',[Validators.required,Validators.maxLength(20)]],
      roles:['',[]],
    })
  }

}
