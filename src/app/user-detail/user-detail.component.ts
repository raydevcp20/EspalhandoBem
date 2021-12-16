import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  favorite:Boolean = false;
  userID:any = undefined;
  userDetail:any = [];
  photos:any = [];
  userLogged:any = [];

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
  ) {
    this.userID = this.router.snapshot.paramMap.get('id');
    this.userID = parseInt(this.userID);
   }

  ngOnInit(): void {
    this.userLogged = localStorage.getItem("user") || [];
    if(this.userLogged.length > 0){
      this.userLogged = JSON.parse(this.userLogged);
      console.log(this.userLogged)
    }else{
      // this.userLogged.type_NID = 'cpf';
    }

    this.userService.getById(this.userID).subscribe(
      (data)=>{
        this.userDetail = data;
        console.log(this.userDetail)
      });

      this.userService.getPhotosByUser(this.userID).subscribe(
        (data:any)=>{
        this.photos = data;

      });
  }

  setFavorite(){
    if(this.userDetail){
      if(this.userDetail.favorited == 1){
        this.userDetail.favorited = 0;
        this.userDetail.user_favorited = null;
      }else{
        this.userDetail.favorited = 1;
        this.userDetail.user_favorited = this.userLogged.id;
      }
      this.userService.setFavorite(this.userDetail).subscribe();
    }
  }

}
