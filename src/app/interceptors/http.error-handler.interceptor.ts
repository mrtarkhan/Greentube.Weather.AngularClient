import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 400 || error.status === 500) {
      let errorMessage = 'An error occurred';
      
      if (error.status === 400) {
        errorMessage = this.handleBadRequest(error);
      } else if (error.status === 500) {
        errorMessage = 'Server Error - Please try again later';
      }

      alert(errorMessage);
    }


    alert(error.message);

    console.log('HTTP Error:', error);

    return throwError(() => error);

  }

  private handleBadRequest(error: HttpErrorResponse): string {
    return error.error?.message || 'Invalid request data';
  }
}