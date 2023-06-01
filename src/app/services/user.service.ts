import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";
import { ErrorHandlerService } from './error-handler.service';

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
    private router: Router
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

  login(userID: string, password: string) {
    return this.http
      .post(`${this.url}/login`, { userID: userID, password: password }, this.httpOptions)
      .pipe(
        // first(),
        // tap((tokenObject: any) => {
        //   this.userId = tokenObject.user.id;
        //   localStorage.setItem("token", tokenObject.token);
        //   localStorage.setItem("user", JSON.stringify(tokenObject.user));
          
        //   // this.cookieService.set('logged', 'true');
        //   this.isUserLoggedIn = true;
        //   this.router.navigate(["timeline"]);
        // }),
        // catchError(
        //   this.errorHandlerService.handleError<{ token: string; userId: number}>("login")
        // )
      );
  }

  saveLink(link:any){
    return this.http
    .post(`${this.url}/saveLink`, link, this.httpOptions)
    .pipe(

    );
  }

  setFavorite(user:any){
    return this.http
    .put(`${this.url}/setFavorite`, user, this.httpOptions)
    .pipe(

    );
  }

  getPhotosByUser(userID: number){
    return this.http
    .get(`${this.url}/listPhotosbyUser/${userID}`, this.httpOptions)
    .pipe(

    );
  }

  getById(userID:number){
    return this.http
    .get(`${this.url}/getById/${userID}`, this.httpOptions)
    .pipe(

    );
  }

  updateUser(user: any){
    return this.http
    .put(`${this.url}/updateUser`, user, this.httpOptions)
    .pipe(

    );
  }

  saveLinks(photos: any){
    return this.http
    .post(`${this.url}/saveLinkList`, photos, this.httpOptions)
    .pipe(

    );
  }

  getAddressByViaCep(cep: string){
    return this.http
    .get(`https://viacep.com.br/ws/${cep}/json/`)
    .pipe(

    );
  }
}
