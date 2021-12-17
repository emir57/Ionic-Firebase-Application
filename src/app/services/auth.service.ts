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
    this.firebaseStore.collection("users").add(
      Object.assign({
        email:user.email,
        firstName:user.firstName,
        lastName:user.lastName
      })
    );
    return this.firebaseAuth.createUserWithEmailAndPassword(user.email,user.password);
  }
  logout(){
    return this.firebaseAuth.signOut();
  }
  login(user:User){
    return this.firebaseAuth.signInWithEmailAndPassword(user.email,user.password)
  }
  getUsers():Observable<any>{
    let users:User[]=[]
    const subject = new Subject<any>();
    const collection:any = this.firebaseStore.collection("users").get()
    collection.subscribe(doc=>{
      doc.forEach(d=>users.push(Object.assign({},d.data())))
      subject.next(users);
    })
    return subject.asObservable();
  }
  getuser(){
    let currentUserEmail = this.firebaseAuth.currentUser.then(user=>{
      console.log(user);
    })
  }
  getCurrentUser():Observable<any>{
    let user:User
    let currentUserEmail="";
    this.getUserEmail().subscribe(email=>{
      currentUserEmail = email;
    })
    const subject = new Subject<any>();
    const collection:any = this.firebaseStore.collection("users").get()
    collection.subscribe(doc=>{
      doc.forEach(d=>{
        console.log(d.data())
        // if(d.email)
        subject.next(user);
      })
    })
    return subject.asObservable();
  }
  private getUserEmail():Observable<any>{
    const subject = new Subject<any>();
    this.firebaseAuth.user.subscribe(doc=>{
      subject.next(doc.email);
    })
    return subject.asObservable();
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
