import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private token: string;
  
  constructor() { }
  
  getToken() {
    return this.token;
  }

  setToken(jwt: string) {
    this.token = jwt;
  }

}
