import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  check:Boolean = false;
  showList:Boolean = false;
  createNewPost:Boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  click(event:any){
    this.check = !this.check;
    console.log()
  }

  navigateTo(url:String){
    this.router.navigate([url]);
  }

  onNewPost():void{
    
  }
}
