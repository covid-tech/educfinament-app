import { Injectable } from '@angular/core';
import { User } from 'models/models';
import { environment } from 'environments/environment.prod';

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
    this.user = user;
  }
  
  getToken() {
    return this.token;
  }
  
  setToken(jwt: string) {
    this.token = jwt;
  }
  
  getUserProfileImg() {
    return environment.SERVER_API_URL + this.user.imatgePerfil.url;
  }

}
