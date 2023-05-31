import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(
    private userService: UserService, 
    private router: Router
    ) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
      let token = window.localStorage.getItem("token");
      if (!token || !this.userService.userAuth()) {
        this.router.navigate(["login"]);
      }
      return this.userService.userAuth();
    }
}