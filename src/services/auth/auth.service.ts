import { Injectable } from '@angular/core';
import { User } from 'models/models';
import { environment } from 'environments/environment.prod';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private token: string;
  
  // private token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU4NjY1MTIzNywiZXhwIjoxNTg5MjQzMjM3fQ.IwwhK0VnPxxwDM0BmjD90omCCN7irwAxFJ82OB3Rgrs";
  // private user : any = {
  //   id: 27,
  //   username: "alum@correu.com",
  //   email: "alum@correu.com",
  //   provider: "local",
  //   confirmed: true,
  //   blocked: null,
  //   role: {id: 5, name: "Participant", description: "", type: "participant"},
  //   nom: "Alumne Mates",
  //   dataNaixement: null,
  //   imatgePerfil: null,
  //   created_at: "2020-04-11T17:14:09.809Z",
  //   updated_at: "2020-04-11T17:14:09.892Z",
  //   alumneGrups: [],
  //   professorGrups: [],
  //   alumneActivitats: [],
  //   professorActivitats: [],
  //   alumneOrganitzacions: [],
  //   professorOrganitzacions: [],
  // }


  // private token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTU4NjYyOTQzNSwiZXhwIjoxNTg5MjIxNDM1fQ.DuAZfzU-b8NkCTu1gqespF7ik3cZ15k0kh0tHJfpHkE";
  // private user: any = {
  //   id: 26,
  //   username: "profe@correu.com",
  //   email: "profe@correu.com",
  //   provider: "local",
  //   confirmed: true,
  //   blocked: null,
  //   role: {id: 5, name: "Participant", description: "", type: "participant"},
  //   nom: "Professor Mates",
  //   dataNaixement: null,
  //   imatgePerfil: null,
  //   created_at: "2020-04-11T17:07:22.468Z",
  //   updated_at: "2020-04-11T17:07:22.550Z",
  //   alumneGrups: [],
  //   professorGrups: [],
  //   alumneActivitats: [],
  //   professorActivitats: [],
  //   alumneOrganitzacions: [],
  //   professorOrganitzacions: []
  //  };


  constructor(private storage: Storage) { }

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

  public existingSession() {
    return new Promise((resolve, reject) => {

      this.storage.get('jwt').then(res => {
        resolve(res != null);
      })

    });
  }

  public getSessionCredentials() {
    return new Promise((resolve, reject) => {

      this.storage.get('email').then(_email => {
        if (_email == null) {
          reject();
        } else {
          this.storage.get('password').then(_password => {
            if (_password == null) {
              reject();
            } else {
              resolve({ email: _email, password: _password });
            }
          });
        }
      });

    });
  }

  public getUserProfileImg() {
    return (this.user.imatgePerfil || "https://educfinament.s3-us-west-2.amazonaws.com/avatars/default.jpg");
  }

}
