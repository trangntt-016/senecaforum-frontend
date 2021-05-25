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


@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    TestComponent,
    NewpostComponent,
    SinglepostComponent,
    sanitizeHtmlPipe,
    CommentComponent
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
