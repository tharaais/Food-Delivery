import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLoginService } from '../new-services/user-login.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginAuthGuard implements CanActivate {

  constructor(private userloginservice: UserLoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userloginservice.returnedUser.user.email != "admin@admin.com") {
      return true;
    } else if (this.userloginservice.returnedUser.user.email === "admin@admin.com") {
      alert("Please, Your Are Not Authorized To Login Using This Account !!");
      return false;
    } else {
      return false;
    }
  }

}
