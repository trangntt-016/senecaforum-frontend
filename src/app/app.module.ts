import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { sanitizeHtmlPipe } from './safe-html.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ForumComponent } from './forum/forum.component';
import { TestComponent } from './test/test.component';
import { NewpostComponent } from './newpost/newpost.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { CommentComponent } from './comment/comment.component';
import { NavbarComponent } from './forum/navbar/navbar.component';
import { TableComponent } from './forum/table/table.component';
import { PaginatorComponent } from './forum/paginator/paginator.component';
import { FilterComponent } from './forum/filter/filter.component';
import { FooterComponent } from './footer/footer.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HotpostComponent } from './mainpage/hotpost/hotpost.component';
import { TopicbannerComponent } from './mainpage/topicbanner/topicbanner.component';
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
// @ts-ignore
import { NavlistComponent } from './frame/navlist/navlist.component';


@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    TestComponent,
    NewpostComponent,
    SinglepostComponent,
    sanitizeHtmlPipe,
    CommentComponent,
    NavbarComponent,
    TableComponent,
    PaginatorComponent,
    FilterComponent,
    FooterComponent,
    MainpageComponent,
    HotpostComponent,
    TopicbannerComponent,
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
    NavlistComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
