import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { NewpostComponent } from './newpost/newpost.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { CommentComponent } from './comment/comment.component';
import { TestComponent } from './test/test.component';
import { MainpageComponent } from './mainpage/mainpage.component';

const routes: Routes = [
  {path: 'forum', component: ForumComponent},
  {path: 'hot', component: MainpageComponent},
  {path: 'posts', component: MainpageComponent},
  {path: 'posts/new', component: NewpostComponent},
  {path: 'posts/:postId/edit', component: NewpostComponent},
  {path: 'posts/:postId', component: SinglepostComponent},
  {path: 'topics/:topicId/posts', component: ForumComponent},
  {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
