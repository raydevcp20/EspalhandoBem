import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  postsPure: any = [];
  userLogged: any = [{ type_NID:'cpf'}];
  categoriesList: any = [];
  filterCategory:string = "Selecione uma categoria";

  constructor(
    private router: Router,
    private postService: PostsService,
    private categoryService: CategoryService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {

    this.userLogged = localStorage.getItem("user") || [];
    console.log(this.userLogged)
    if(this.userLogged.length > 0){
      console.log("dalee")
      this.userLogged = [JSON.parse(this.userLogged)];
    }else{
      
      // this.userLogged[0].type_NID = 'cpf';
    }

    this.categoryService.listAllCategories().subscribe(
      (data)=>{
        this.categoriesList = data;
      });

    this.postService.listAllPosts().subscribe(
      (data)=>{
        // console.log(data)
        this.posts = data;
        this.postsPure = [...this.posts];
      });
  }

  filterByName(event: any){
    this.posts = this.postsPure.filter((post:any)=>{
      return post.title.trim().toUpperCase().includes(event.target.value.trim().toUpperCase());
    })
  }

  filterByCategory(category:any){
    if(category == "all"){
      this.posts = this.postsPure;
      this.showList = !this.showList;
      return
    }
    this.filterCategory = category.name;

    this.posts = this.postsPure.filter((post:any)=>{
      return post.idCategory == category.id;
    })
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
      this.postService.setFavorite(post).subscribe((data)=>{

        this.toastr.success('Hello world!', 'Toastr fun!');
      });
    }
  }

  onNewPost():void{
    this.newPost.user = this.userLogged[0];
    if(this.userLogged[0].type_NID == 'cnpj'){
      this.postService.createNewPost(this.newPost).subscribe(
        (msg:any)=>{ 
          this.toastr.success('Post criado', msg.message);
        }
      );
      this.newPost = {};
      this.createNewPost = !this.createNewPost
    }
  }
}
