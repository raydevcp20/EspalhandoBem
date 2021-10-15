import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  check:Boolean = false;
  showList:Boolean = false;
  createNewPost:Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  click(event:any){
    this.check = !this.check;
    console.log()
  }

}
