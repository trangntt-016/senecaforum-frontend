import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from '../model/User';
import { AuthService } from '../auth.service';
import { DataManagerService } from "../data-manager.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public registerUser: AuthUser;
  public warning: string;
  public success: boolean;
  public loading: boolean;
  public isDisabled: boolean;
  public password2: string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private dataService: DataManagerService) { }

  ngOnInit(): void {
    this.registerUser = new AuthUser('U');
    this.warning = '';
    this.success = false;
    this.loading = false;
    this.isDisabled = true;
  }

  onSubmit(f: NgForm): void {
    if (this.registerUser.username != ''
      && this.registerUser.password != ''
      && this.registerUser.password == this.password2
    ){
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        (success) => {
          this.loading = false;
          this.success = false;
          this.warning = null;
          // store the returned token in local storage as 'access_token'
          this.router.navigate(['/login']);
        },
        (err) => {
          this.success = false;
          this.loading = false;
          this.warning = err.error.message;
        }
      );
    }

  }


}
