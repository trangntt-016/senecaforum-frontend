import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:'forum',component:ForumComponent},
  {path:'test',component:TestComponent},
  {path:'topics/:topicId/posts',component:ForumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
