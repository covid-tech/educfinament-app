import { Injectable } from '@angular/core';
import { EducfinamentAPIClient } from 'services/EducfinamentAPIClient';
import { environment } from 'environments/environment';
import { AuthenticateRequest, AuthenticateResponse, SignUpRequest, SignUpResponse, User } from 'models/models';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserManagerAPIClient extends EducfinamentAPIClient {

  constructor(public http: HttpClient, public storage: Storage, private auth: AuthService) {
    super(http, storage);
  }

  signIn(data: AuthenticateRequest) {
    let url = environment.SERVER_API_URL + "/infoUsuari/login";

    return Observable.create(observer => {
      this.postContentToURL(url, JSON.stringify(data)).subscribe(
        (res: AuthenticateResponse) => {

          this.storage.set('jwt', res.jwt);
          this.storage.set('email', data.user);
          this.storage.set('password', data.pass);
          this.auth.setToken(res.jwt);
          this.auth.setUser(res.user);
          observer.next(res);
          observer.complete();
        }, err => {
          observer.error(err);
        }, () => { }
      );
    });
  }

  signUp(data: SignUpRequest) {
    let url = environment.SERVER_API_URL + "/infoUsuari/registre";

    return Observable.create(observer => {
      this.postContentToURL(url, JSON.stringify(data)).subscribe(
        (res: SignUpResponse) => {
          observer.next(res);
          observer.complete();
        }, err => {
          observer.error(err);
        }, () => {}
      );

    });
  }

  logout() {
    this.storage.remove('jwt');
    this.auth.setToken(null);
    this.auth.setUser(null);
  }

  getInfoUsuari(id: string) {
    let url = environment.SERVER_API_URL + "/infoUsuari/" + id;
    return Observable.create(observer => {
      this.getContentFromURL(url).subscribe(
        (res: User) => {
          observer.next(res);
          observer.complete();
        }, err => {
          observer.error(err);
        }
      );
    })
  }

}
