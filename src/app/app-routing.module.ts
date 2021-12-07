import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AuthGuard } from './services/auth-guard.service';
import { TimelineComponent } from './timeline/timeline.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'timeline', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard]},
  {path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: 'userdetail/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
