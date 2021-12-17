import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firebaseStore:AngularFirestore,
    private authService:AuthService
  ) { }

  addUser(user:User){
    this.authService.register(user);
    return this.firebaseStore.collection("users").add(user);
  }
  updateUser(user:User){
    return this.firebaseStore.collection("users").doc(user.id).update(user);
  }
  deleteUser(id:string){
    return this.firebaseStore.collection("users").doc(id).delete();
  }
}
