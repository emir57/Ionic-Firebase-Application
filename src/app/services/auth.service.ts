import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth:AngularFireAuth,
    private firebaseStore:AngularFirestore
  ) { }

  register(user:User){
    this.firebaseStore.collection("users").add(user);
    return this.firebaseAuth.createUserWithEmailAndPassword(user.email,user.password);
  }
  logout(){
    return this.firebaseAuth.signOut();
  }
  login(user:User){
    return this.firebaseAuth.signInWithEmailAndPassword(user.email,user.password)
  }

  getUserId():Observable<any>{
    const subject = new Subject<any>();
    this.firebaseAuth.user.subscribe(doc=>{
      subject.next(doc.uid);
    })
    return subject.asObservable();
  }

  getUsers(){
    const subject = new Subject<any>();

  }


  setErrorMessage(error:any):string{
    if(error.code=="auth/wrong-password"){
      return "şifre yanlış";
    }else if(error.code=="auth/user-not-found"){
      return "kullanıcı bulunamadı";
    }
  }

  setRememberMe(loginModel:any){
    if(loginModel.rememberMe){
      localStorage.setItem("user",JSON.stringify(loginModel))
    }
  }
  removeRememberMe(){
    const storage = localStorage.getItem("user")
    if(storage){
      localStorage.removeItem("user");
    }
  }
}
