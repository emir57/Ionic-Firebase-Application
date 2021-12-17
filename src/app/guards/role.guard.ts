import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const subject = new Subject<boolean>();
      this.authService.getCurrentUser().subscribe(user => {
        if(this.isInRole(user,"Admin")){
          subject.next(true);
        }else{
          subject.next(false);
        }
      })
    return subject.asObservable();
  }

  isInRole(user:User,role:string) {
    let check = false;
    let roles= user.roles.split(",");
    roles.forEach(r=>{
      if(r.toLocaleLowerCase()===role.toLocaleLowerCase()){
        check=true;
      }
    })
    return check;
  }

}
