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
    console.log(this.userLogged)
    this.userLogged = JSON.parse(this.userLogged);

    this.getLinks();
  }

  getLinks(){
    this.userService.getPhotosByUser(this.userLogged.id).subscribe(
      (data:any)=>{
        this.pictures = data;
      }
    );
  }

  addNewLink():void{
    this.newLink.id_user = this.userLogged.id;
    this.userService.saveLink(this.newLink).subscribe();

    this.addLink = !this.addLink;
    this.getLinks();
  }

  editData():void{
    this.userService.saveLink(this.newLink).subscribe();
  }

  editProfile():void{
    this.userService.updateUser(this.userLogged).subscribe(
      (data:any)=>{
        data.user = JSON.stringify(data.user);
        console.log(data.user)
        localStorage.setItem("user", data.user);
        this.ngOnInit();
      }
    );
    this.editingData = !this.editingData
  }


}
