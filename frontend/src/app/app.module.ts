import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CreatePostModalComponent } from './timeline/modal/create-post-modal/create-post-modal.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    FavoriteComponent,
    UserDetailComponent,
    MyProfileComponent,
    CreatePostModalComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
