import { Injectable } from '@angular/core';
import { SerializationHelper } from 'models/SerializationHelper';
import { EducfinamentAPIClient } from 'services/EducfinamentAPIClient';
import { environment } from 'environments/environment';
import { AuthenticateRequest, AuthenticateResponse, SignUpRequest, SignUpResponse } from 'models/models';
import { Observable } from 'rxjs';

@Injectable()
export class UserManagerAPIClient extends EducfinamentAPIClient {

    signIn(data: AuthenticateRequest) {
      let url = environment.SERVER_API_URL + "/infoUsuari/login";

      return Observable.create(observer => {
        this.postContentToURL(url, JSON.stringify(data)).subscribe(
          (res: AuthenticateResponse) => {
            this.storage.set('jwt', res.jwt);
            observer.next(res);
            observer.complete();
          }, err => {
            observer.error(err);
          }, () => {}
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
    }

}
