import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";
import { ErrorHandlerService } from './error-handler.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3000/auth";
  isUserLoggedIn:boolean = false;
  userId: number = 0;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    
  }

  userAuth(): boolean{
    return this.isUserLoggedIn;
  }

  createUser(user: any): any {
    return this.http
      .post(`${this.url}/createUser`, user, this.httpOptions)
      .pipe(

      );
  }

  login(email: string, password: string) {
    
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: any) => {
          this.userId = tokenObject.user.id;
          localStorage.setItem("token", tokenObject.token);
          localStorage.setItem("user", JSON.stringify(tokenObject.user));
          
          // this.cookieService.set('logged', 'true');
          this.isUserLoggedIn = true;
          this.router.navigate(["timeline"]);
        }),
        catchError(
          this.errorHandlerService.handleError<{ token: string; userId: number}>("login")
        )
      );
  }
}
