import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'timeline', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'favorite', component: FavoriteComponent},
  {path: 'myprofile', component: MyProfileComponent},
  {path: 'userdetail', component: UserDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
