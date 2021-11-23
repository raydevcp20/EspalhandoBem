import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signUpButton: any = "";
  signInButton: any = "";
  container: any = "";
  constructor() { }

  ngOnInit(): void {
  
    this.container = document.getElementById('container');
    console.log(this.container);
  }

  signIn(){
    this.container.classList.remove("right-panel-active");
  }

  signUp(){
    this.container.classList.add("right-panel-active");
  }


}
