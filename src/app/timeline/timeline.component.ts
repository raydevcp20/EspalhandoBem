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
  categoriesList: any = [];
  filterCategory:string = "Selecione uma categoria";

  constructor(
    private router: Router,
    private postService: PostsService,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.categoryService.listAllCategories().subscribe(
      (data)=>{
        this.categoriesList = data;
      });

    this.postService.listAllPosts().subscribe(
      (data)=>{
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
    if(post.favorite == 1){
      post.favorite = 0;
    }else{
      post.favorite = 1;
    }
    this.postService.setFavorite(post).subscribe();
  }

  onNewPost():void{
    this.newPost.user =  {
      id: 1,
      name: 'teste1',
      type_NID: 'cnpj',
      email: 'teste@gmail.com',
      password: '123456',
      description: 'lorem doafvsdifnsdf gdf',
      id_category: 1,
      cep: '1234567',
      street: 'rua teste',
      city: 'testeee',
      state: 'estestes unidos',
      cnpj: '193029234823',
      cpf: null,
      telephone: '12345678'
    };
    this.postService.createNewPost(this.newPost).subscribe();
    this.newPost = {};
    this.createNewPost = !this.createNewPost
  }
}
