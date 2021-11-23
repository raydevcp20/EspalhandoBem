import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  check:Boolean = false;
  showList:Boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  click(event:any){
    this.check = !this.check;
  }

  navigateTo(url:String){
    this.router.navigate([url]);
  }


}
