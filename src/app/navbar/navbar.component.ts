import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showMenu:Boolean = false;
  showNavbar:Boolean = false;

  constructor(private route: Router, private authService: UserService) { }
  
  ngOnInit(): void {
    // this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
    //   this.isAuthenticated = isLoggedIn;
    // });
  }

  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn = false;
    this.route.navigate(["login"]);
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }
  toggleNavbar(){
    this.showNavbar = !this.showNavbar;
  }
}
