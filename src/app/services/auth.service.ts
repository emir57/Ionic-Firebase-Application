import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth:AngularFireAuth
  ) { }

  register(){
    return this.firebaseAuth.createUserWithEmailAndPassword("emir@hotmail.com","123456");
  }
  logout(){
    return this.firebaseAuth.signOut();
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
}
