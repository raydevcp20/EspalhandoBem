import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = "https://espalhando-o-bem.herokuapp.com/auth";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient
  ) { }

  listAllCategories(){
    return this.http
      .get(`${this.url}/listCategories`, { responseType: "json" })
      .pipe(
        
      );
  }

  
}
