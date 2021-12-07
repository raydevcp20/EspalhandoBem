import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService, 
    private router: Router, 
    private cookieService: CookieService
    ) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
      let token = window.localStorage.getItem("token");
      if (!token || !this.userService.userAuth()) {
        this.router.navigate(["login"]);
      }
      return this.userService.userAuth();
    }
}