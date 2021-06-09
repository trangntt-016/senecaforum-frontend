import { EventEmitter, Injectable, Output } from '@angular/core';
import { AuthUser, LogInUser, Payload, User, ViewUser } from './model/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  // emit changes from nested child component (login) to parent component (app)
  @Output()payload: EventEmitter<Payload> = new EventEmitter();

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private helper = new JwtHelperService();
  sendPayload(payload: Payload): any{
    this.payload.emit(payload);
  }

  register(registerUser: AuthUser): Observable<any>{
    return this.http.post<AuthUser>(`http://localhost:3000/api/users/new`, registerUser, this.httpOptions);
  }

  login(loginUser: LogInUser): Observable<any>{
    return this.http.post<ViewUser>(`http://localhost:3000/api/users/login`, loginUser, { observe: 'response' });
  }

  getToken(): string{
    if (localStorage.getItem('access_token')){
      return localStorage.getItem('access_token');
    }
    return sessionStorage.getItem('access_token');
  }

  readToken(): Payload{
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
    sessionStorage.removeItem('access_token');
    sessionStorage.clear();
  }



}
