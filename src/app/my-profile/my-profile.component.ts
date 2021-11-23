import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  addLink:boolean = false;
  newLink: any = '';
  editingData:boolean = false;
  arrayLinks: any = [];
  profile:any = [];

  constructor() { }

  ngOnInit(): void {
  }

  addNewLink():void{
    console.log(this.newLink);
    this.arrayLinks.push(this.newLink);
    this.addLink = !this.addLink;
  }

  editData():void{
    console.log(this.newLink);
  }

  editProfile():void{
    console.log(this.newLink);
  }
}
