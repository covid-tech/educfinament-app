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

  // private user: any = {
  //   id: "20",
  //   username: "sergi@correu.com",
  //   email: "sergi@correu.com",
  //   provider: "local",
  //   confirmed: true,
  //   blocked: null,
  //   role: {
  //       id: 5,
  //       name: "Participant",
  //       description: "",
  //       type: "participant"
  //   },
  //   nom: "Sergi Domenech Balta",
  //   dataNaixement: null,
  //   created_at: "2020-04-10T14:59:22.719Z",
  //   updated_at: "2020-04-10T19:24:29.522Z",
  //   imatgePerfil: {
  //       id: 5,
  //       name: "logo_trans.png",
  //       hash: "a3cea8a6f8ce41b2a40bcefb35e50bab",
  //       sha256: "ULNZVf-ZaACNcy40oNg5cI6cGqPRGCM-GI1ho9TnkCA",
  //       ext: ".png",
  //       mime: "image/png",
  //       size: 63.29,
  //       url: "/uploads/a3cea8a6f8ce41b2a40bcefb35e50bab.png",
  //       provider: "local",
  //       provider_metadata: null,
  //       created_at: "2020-04-10T16:12:01.825Z",
  //       updated_at: "2020-04-10T16:12:01.825Z"
  //   }
  // };
  // private token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTU4NjU1NDkzMiwiZXhwIjoxNTg5MTQ2OTMyfQ.2IkZwuhf5T4y5UkuDZbCM-oPWrXVh2uhbShcfFDV3Ag";

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
