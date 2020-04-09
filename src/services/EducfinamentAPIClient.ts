import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Authenticate, AuthenticateResponse, SignUp, SignUpResponse } from 'models/models';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EducfinamentAPIClient {

  constructor(
    private http: HttpClient
  ) {
  }

  login(data: Authenticate) {
    let url = environment.SERVER_API_URL + "/infoUsuari/login";

    return Observable.create(observer => {
      this.postContentToURL(url, JSON.stringify(data)).subscribe(
        (res: AuthenticateResponse) => {
          observer.next(res);
          observer.complete();
        }, err => {
          observer.error(err);
        }, () => {}
      );
    });
  }

  logout() {
    let url = environment.SERVER_API_URL + "/infoUsuari/logout";

    return Observable.create(observer => {
      this.getContentFromURL(url).subscribe(
        data => {
          observer.next({});
          observer.complete();
        }, err => {
          observer.error(err);
        }, () => {}
      );
    });
  }

  signUp(data: SignUp) {
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

  private handleError(error: HttpErrorResponse) {
    return error;
  };

  public getContentFromURL(url: string):any {
    let requestURL = url;
    const httpHeaders = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type": "application/json",
    });

    return this.http.get(requestURL, {
      headers: httpHeaders,
      withCredentials: true,
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public deleteContentFromURL(url: string):any {
    let requestURL = url;
    const httpHeaders = new HttpHeaders({
      "Accept": "application/json",
    });

    return this.http.delete(requestURL, {
      headers: httpHeaders,
      withCredentials: true,
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public putContentToURL(url: string, content: string):any {
    let requestURL = url;
    const httpHeaders = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type": "application/json",
    });

    return this.http.put(requestURL, content, {
      headers: httpHeaders,
      withCredentials: true,
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public postContentToURL(url: string, content: string):any {
    let requestURL = url;
    const httpHeaders = new HttpHeaders({
      "Accept": "application/json",
      'Content-Type': 'application/json'
    });

    return this.http.post(requestURL, content, {
      headers: httpHeaders,
      withCredentials: true,
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

}
