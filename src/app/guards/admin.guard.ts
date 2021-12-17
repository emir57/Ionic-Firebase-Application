import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService:AuthService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const subject = new Subject<boolean>();
      this.authService.getCurrentUser().subscribe(user => {
        if(this.authService.isInRole(user,"Admin")){
          subject.next(true);
          return true;
        }else{
          subject.next(false);
          return false;
        }
      })
    return subject.asObservable();
  }

}
