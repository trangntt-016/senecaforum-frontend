import { EventEmitter, Injectable, Output } from '@angular/core';
import { AuthUser, LogInUser, payload, User } from './model/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // emit changes from nested child component (login) to parent component (app)
  @Output()username: EventEmitter<string> = new EventEmitter();
  sendUsername(username: string){
    this.username.emit(username);
  }

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private helper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  register(registerUser: AuthUser): Observable<any>{
    return this.http.post<AuthUser>(`http://localhost:3000/api/users/new`, registerUser, this.httpOptions);
  }

  login(loginUser: LogInUser): Observable<any>{
    return this.http.post<LogInUser>(`http://localhost:3000/api/users/login`, loginUser,{ observe: 'response' });
  }

  getToken(): string{
    return localStorage.getItem('access_token');
  }

  readToken(): payload{
    const rawToken = this.getToken();
    return this.helper.decodeToken(rawToken);
  }

  isAuthenticated(): boolean{
    if (this.getToken()){
      return true;
    }
    return false;
  }

  getRole(): string{
    return this.readToken().role;
  }



  public logout(): void{
    localStorage.removeItem('access_token');
    localStorage.clear();
  }



}
