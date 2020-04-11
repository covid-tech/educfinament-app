import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        const currentAuthToken = this.auth.getToken();
        
        if (currentAuthToken) {
            const headers = {
                'Authorization': `Bearer ${currentAuthToken}`,
            };
            if (request.responseType === 'json') {
                headers['Content-Type'] = 'application/json';
            }
            request = request.clone({
                setHeaders: headers
            });
        }

        return next.handle(request);
    }


}