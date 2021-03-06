import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { sanitizeHtmlPipe } from './safe-html.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ForumComponent } from './forum/forum.component';
import { NewpostComponent } from './newpost/newpost.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { CommentComponent } from './comment/comment.component';
import { NavbarComponent } from './forum/navbar/navbar.component';
import { TableComponent } from './forum/table/table.component';
import { FilterComponent } from './forum/filter/filter.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HotpostComponent } from './mainpage/hotpost/hotpost.component';
import { SearchComponent } from './mainpage/search/search.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProfileComponent } from './user-dashboard/profile/profile.component';
import {
  DialogElements, MypostsComponent
} from './user-dashboard/myposts/myposts.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin-dashboard/admin-profile/admin-profile.component';
import { UserPostsComponent } from './admin-dashboard/user-posts/user-posts.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChatpanelComponent } from './chatpanel/chatpanel.component';
import { TopNavbarComponent } from './frame/top-navbar/top-navbar.component';
import { NavlistComponent } from './frame/navlist/navlist.component';
import { InterceptTokenService } from './intercept-token.service';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    NewpostComponent,
    SinglepostComponent,
    sanitizeHtmlPipe,
    CommentComponent,
    NavbarComponent,
    TableComponent,
    FilterComponent,
    MainpageComponent,
    HotpostComponent,
    SearchComponent,
    SignupComponent,
    LoginComponent,
    UserDashboardComponent,
    ProfileComponent,
    MypostsComponent,
    DialogElements,
    AdminDashboardComponent,
    AdminProfileComponent,
    UserPostsComponent,
    ChatboxComponent,
    ChatpanelComponent,
    TopNavbarComponent,
    NavlistComponent,
    AboutComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CKEditorModule,
        MatCheckboxModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptTokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
