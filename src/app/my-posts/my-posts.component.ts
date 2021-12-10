import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  check:Boolean = false;
  showList:Boolean = false;
  myPosts: any = [];
  userLogged: any = [];
  categoriesList: any = [];
  filterCategory:string = "Selecione uma categoria";

  constructor(
    private router: Router,
    private postService: PostsService,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.userLogged = localStorage.getItem("user");
    this.userLogged = JSON.parse(this.userLogged);

    this.categoryService.listAllCategories().subscribe(
      (data)=>{
        this.categoriesList = data;
      });

    this.postService.getByUser(this.userLogged.id).subscribe(
      (data)=>{
        this.myPosts = data;
      });
  }

  deletePost(post:any){
    post.deleted = 1;
    this.postService.deletePost(post).subscribe();

    this.ngOnInit();
  }

  filterByCategory(category:any){
    this.filterCategory = category.name;
    this.showList = !this.showList;
  }

  click(event:any){
    this.check = !this.check;
  }

  navigateTo(url:String){
    this.router.navigate([url]);
  }

}
