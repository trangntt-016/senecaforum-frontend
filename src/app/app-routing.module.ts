import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { NewpostComponent } from './newpost/newpost.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { CommentComponent } from './comment/comment.component';
import { TestComponent } from './test/test.component';
import { WhatshotComponent } from './whatshot/whatshot.component';

const routes: Routes = [
  {path: 'forum', component: ForumComponent},
  {path: 'whatshot', component: WhatshotComponent},
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
