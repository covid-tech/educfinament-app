import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class EducfinamentAPIClient {

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
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
      headers: httpHeaders
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

}
