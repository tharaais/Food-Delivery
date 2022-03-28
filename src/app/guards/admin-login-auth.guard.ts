import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminLoginService } from '../admin/services/admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginAuthGuard implements CanActivate {

  constructor(private adminLoginService: AdminLoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.adminLoginService.returnedUser.user.email === "admin@admin.com") {
      return true;
    } else {
      return false;
    }
  }

}
