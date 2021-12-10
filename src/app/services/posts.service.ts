import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url = "http://localhost:3000/auth";
  
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
  ) { }

  
  createNewPost(post:any){
    return this.http.post(`${this.url}/createPost`, post, this.httpOptions).pipe(

    );
  }

  deletePost(post:any){
    return this.http.put(`${this.url}/editPost`, post, this.httpOptions).pipe(

    );
  }

  setFavorite(post:any){
    return this.http.put(`${this.url}/editPost`, post, this.httpOptions).pipe(

    );
  }

  getByUser(userID:any){
    return this.http
      .get(`${this.url}/listPostsByUser/${userID}`, { responseType: "json" })
      .pipe(
        
      );
  }

  filterByFavorites(userID:number){
    return this.http
      .get(`${this.url}/listFavorites/${userID}`, { responseType: "json" })
      .pipe(
        
      );
  }

  listAllPosts(){
    return this.http
      .get(`${this.url}/listAllPosts`, { responseType: "json" })
      .pipe(
        
      );
  }
}
