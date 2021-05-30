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
// @ts-ignore
import { MainpageComponent } from './mainpage/mainpage.component';
// @ts-ignore
import { HotpostComponent } from './mainpage/hotpost/hotpost.component';
// @ts-ignore
import { TopicbannerComponent } from './mainpage/topicbanner/topicbanner.component';
import { SearchComponent } from './mainpage/search/search.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
