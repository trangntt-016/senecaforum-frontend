import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';

const routes: Routes = [
  {path:'forum',component:ForumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
