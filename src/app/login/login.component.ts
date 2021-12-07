import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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

  newUser: any = {};

  email: string="";
  password: string="";

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    // this.cookieService.set('logged', 'false');
    this.container = document.getElementById('container');
  }

  createUser(): void {
    this.userService.createUser(this.newUser).subscribe((msg:string) => {
      console.log(msg);
      this.router.navigate(["login"]);
    });
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
