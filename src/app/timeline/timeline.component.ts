import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  check:Boolean = false;
  showList:Boolean = false;
  createNewPost:Boolean = false;
  newPost: any = {};
  posts: any = [];
  userLogged: any = [{ type_NID:'cpf'}];
  categoriesList: any = [];
  filterCategory:string = "Selecione uma categoria";

  constructor(
    private router: Router,
    private postService: PostsService,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.userLogged = localStorage.getItem("user") || [];
    if(this.userLogged.length > 0){
      this.userLogged = [JSON.parse(this.userLogged)];
      console.log(this.userLogged)
    }else{
      // this.userLogged.type_NID = 'cpf';
    }

    this.categoryService.listAllCategories().subscribe(
      (data)=>{
        this.categoriesList = data;
      });

    this.postService.listAllPosts().subscribe(
      (data)=>{
        console.log(data)
        this.posts = data;
      });
  }

  filterByCategory(category:any){
    this.filterCategory = category.name;
    this.showList = !this.showList;
  }

  navigateTo(url:String){
    this.router.navigate([url]);
  }

  setFavorite(post:any){
    if(this.userLogged){
      if(post.favorite == 1){
        post.favorite = 0;
      }else{
        post.favorite = 1;
      }
      this.postService.setFavorite(post).subscribe();
    }
  }

  onNewPost():void{
    this.newPost.user = this.userLogged;
    if(this.userLogged.type_NID == 'cnpj'){
      this.postService.createNewPost(this.newPost).subscribe();
      this.newPost = {};
      this.createNewPost = !this.createNewPost
    }
  }
}
