import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AuthUser, LogInUser } from '../model/User';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: LogInUser;
  public warning: string;
  public color: string;
  public loading: boolean;
  public isDisabled: boolean;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new LogInUser();
    this.warning = '';
    this.color = 'accent';
    this.loading = false;
  }

  onSubmit(f: NgForm): void {
    if (this.user.email != "" && this.user.password != "") {
      this.loading = true;
      this.auth.login(this.user).subscribe(
        (success) => {
          let jwt = success.headers.get("Authorization").substring("Bearer ".length);
          this.loading = false;
          this.warning = null;
          // store the returned token in local storage as 'access_token'
          localStorage.setItem('access_token', jwt);
          let username = this.auth.readToken().sub;
          // emit username changes to the parent component via auth service
          this.auth.sendUsername(username);
          this.router.navigate(['hot']);
        },
        (err) => {
          this.loading = false;
          this.warning = err.error.message;
        }
      );
    }
  }

}
