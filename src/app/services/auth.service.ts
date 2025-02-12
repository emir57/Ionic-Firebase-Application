import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseStore: AngularFirestore,
    private userService: UserService
  ) { }
  isLogin = false;
  isAuthentication(): boolean {
    return this.isLogin;
  }
  register(user: User) {
    return this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password);
  }
  logout() {
    return this.firebaseAuth.signOut();
  }
  login(user: User) {
    return this.firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
  }
  getUsers(): Observable<any> {
    let users: User[] = []
    const subject = new Subject<any>();
    const collection: any = this.firebaseStore.collection("users").get()
    collection.subscribe(doc => {
      doc.forEach(d => users.push(Object.assign({ id: d.id }, d.data())))
      subject.next(users);
    })
    return subject.asObservable();
  }
  getuser(email: string) {
    let getUser: User
    const subject = new Subject<any>();
    this.getUsers().subscribe(users => {
      users.forEach(user => {
        if (user.email === email) {
          getUser = user
          subject.next(getUser);
        }
      })
    })
    return subject.asObservable();
  }
  getCurrentUser(): Observable<User> {
    let currentUser: User
    let currentUserEmail = "";
    this.getUserEmail().subscribe(email => {
      currentUserEmail = email;
    })
    const subject = new Subject<any>();
    console.log(currentUserEmail)
    this.getUsers().subscribe(users => {
      users.forEach(user => {
        if (user.email === currentUserEmail) {
          currentUser = user
          subject.next(currentUser);
        }
      })
    })
    return subject.asObservable();
  }
  isInRole(user: User, role: string) {
    let check = false;
    let roles = user.roles.split(",");
    roles.forEach(r => {
      if (r.toLocaleLowerCase() === role.toLocaleLowerCase()) {
        check = true;
      }
    })
    return check;
  }
  resetPassword(email: string) {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }
  private getUserEmail(): Observable<any> {
    const subject = new Subject<any>();
    this.firebaseAuth.user.subscribe(doc => {
      subject.next(doc.email);
    })
    return subject.asObservable();
  }


  setErrorMessage(error: any): string {
    const code = error.code;
    switch (code) {
      case "auth/wrong-password":
        return "şifre yanlış";
      case "auth/user-not-found":
        return "kullanıcı bulunamadı";
      case "auth/invalid-email":
        return "geçersiz eposta"
      case "auth/email-already-in-use":
        return "böyle bir kullanıcı zaten var"
      default:
        "Bilinmeyen bir hata oluştu";
    }
  }

  setRememberMe(loginModel: any) {
    this.getuser(loginModel.email).subscribe(user => {
      user.password = "";
      localStorage.setItem("user", JSON.stringify(user))
    })
  }
  getUserInStorage(): User {
    let session = sessionStorage.getItem("user");
    let local = localStorage.getItem("user");
    if (session) {
      return JSON.parse(session);
    }
    if (local) {
      return JSON.parse(local);
    }
  }
  removeRememberMe() {
    const storage = localStorage.getItem("user")
    if (storage) {
      localStorage.removeItem("user");
    }
  }
  checkLocalRemember(): Boolean {
    const storage = localStorage.getItem("user")
    if (storage) {
      return true;
    }
    return false;
  }
  checkSessionRemember(): Boolean {
    const storage = sessionStorage.getItem("user")
    if (storage) {
      return true;
    }
    return false;
  }
}
