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

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
  ) {
    this.userID = this.router.snapshot.paramMap.get('id');
    this.userID = parseInt(this.userID);
   }

  ngOnInit(): void {
    this.userService.getById(this.userID).subscribe(
      (data)=>{
        console.log(data)
        this.userDetail = data;
      });
  }

}
