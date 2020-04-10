import { Injectable } from '@angular/core';
import { User } from 'models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private user: User;
  private token: string;
  
  constructor() { }

  getUser() {
    return this.user;
  }

  setUser(user: any) {
    console.log("user", user);
    
    this.user = user;
  }

  getToken() {
    return this.token;
  }

  setToken(jwt: string) {
    this.token = jwt;
  }

}
