import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signUpButton: any = "";
  signInButton: any = "";
  container: any = "";

  passwordEquals: boolean = true;

  newUser: any = {};

  categoriesList: any = [];

  email: string="";
  password: string="";

  constructor(
    private userService: UserService,
    private router: Router,
    private categoryService: CategoryService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    // this.cookieService.set('logged', 'false');
    this.container = document.getElementById('container');

    this.categoryService.listAllCategories().subscribe(
      (data)=>{
        this.categoriesList = data;
      });

    this.newUser.typeNID = 'cpf';
  }

  choiceOn(typeID: string){
    this.newUser.typeNID = typeID;
  }

  choiceCategory(idCategory: string){
    this.newUser.idCategory = idCategory;
  }

  createUser(): void {
    this.userService.createUser(this.newUser).subscribe((msg:string) => {
      console.log(msg);
      this.router.navigate(["timeline"]);
    });
  }

  checkPassword($event: any): void {
    let password = $event.target.value;

    if(password == this.newUser.password){
      this.passwordEquals = true;
    }else{
      this.passwordEquals = false;
    }
  }

  login(): void {
    this.userService
      .login(this.email, this.password)
      .subscribe();
  }

  logout(): void {
    localStorage.removeItem("token");
    this.userService.isUserLoggedIn = false;
    // this.router.navigate(["login"]);
  }

  signIn(){
    this.container.classList.remove("right-panel-active");
  }

  signUp(){
    this.container.classList.add("right-panel-active");
  }


}
