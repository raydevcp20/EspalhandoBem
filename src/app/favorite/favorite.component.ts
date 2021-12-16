import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  check:Boolean = false;
  showList:Boolean = false;
  posts: any = [];
  categoriesList: any = [];
  filterCategory:string = "Selecione uma categoria";
  userLogged:any = [];
  postsPure: any = [];

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

    this.postService.filterByFavorites(this.userLogged.id).subscribe(
      (data)=>{
        console.log(data)
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

  click(event:any){
    this.check = !this.check;
  }

  navigateTo(url:String){
    this.router.navigate([url]);
  }


}
