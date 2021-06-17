import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { NewpostComponent } from './newpost/newpost.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { GuardAuthService } from './guard-auth.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'forum', component: ForumComponent},
  {path: 'chat', component: ChatboxComponent},
  {path: 'hot', component: MainpageComponent},
  {path: 'register', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'posts', component: MainpageComponent},
  {path: 'posts/new', component: NewpostComponent},
  {path: 'users/:userId/posts/:postId/edit', component: NewpostComponent, canActivate: [GuardAuthService]
    , data: {
      role: 'ROLE_USER'
    }},
  {path: 'topics/:topicId/posts/:postId', component: SinglepostComponent},
  {path: 'topics/:topicId/posts', component: ForumComponent},
  {path: 'users/:userId/posts', component: UserDashboardComponent, canActivate: [GuardAuthService]
    , data: {
      role: 'ROLE_USER'
    }},
  {path: 'users/:userId/admin', component: AdminDashboardComponent, canActivate: [GuardAuthService]
    , data: {
      role: 'ROLE_ADMIN'
    }},
  {path: '**', redirectTo: 'hot', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
