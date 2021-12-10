import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../services/auth-guard.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  addLink:boolean = false;
  newLink: any = {};
  editingData:boolean = false;
  arrayLinks: any = [];
  profile:any = {};
  userLogged:any = {};
  

  pictures:any = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userLogged = localStorage.getItem("user");
    this.userLogged = JSON.parse(this.userLogged);
    console.log(this.userLogged);
    this.getLinks();
  }

  getLinks(){
    this.userService.getLinksByUser(this.userLogged.id).subscribe(
      (data:any)=>{
        console.log(data)
        this.pictures = data;
      }
    );
  }

  addNewLink():void{
    console.log(this.userLogged.id)
    this.newLink.id_user = this.userLogged.id;
    console.log(this.newLink);
    this.userService.saveLink(this.newLink).subscribe();

    this.addLink = !this.addLink;
  }

  editData():void{
    console.log(this.newLink);
    this.userService.saveLink(this.newLink).subscribe();
  }

  editProfile():void{
    console.log(this.userLogged);
    this.userService.updateUser(this.userLogged).subscribe();
    this.editingData = !this.editingData
  }


}
