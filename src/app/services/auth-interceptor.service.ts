import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ){
    const token = localStorage.getItem("token");
    console.log("token ",token)
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token),
      });
      console.log("clone ",clonedRequest);
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}