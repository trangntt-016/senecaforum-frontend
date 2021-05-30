import { Injectable } from '@angular/core';
import { RegisterUser, User } from "./model/User";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions:{headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type":"application/json"})
  }

  constructor(private http: HttpClient) { }

  register(registerUser: RegisterUser): Observable<any>{
    return this.http.post<RegisterUser>(`http://localhost:3000/api/users/new`, registerUser, this.httpOptions);
  }
}
