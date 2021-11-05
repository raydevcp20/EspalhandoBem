import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showMenu:Boolean = false;
  showNavbar:Boolean = false;

  constructor() { }
  
  ngOnInit(): void {
  }
  
  toggleMenu(){
    this.showMenu = !this.showMenu;
  }
  toggleNavbar(){
    this.showNavbar = !this.showNavbar;
  }
}
