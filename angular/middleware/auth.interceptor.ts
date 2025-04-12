import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../service/http/auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next): any => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // const cookieService = inject(CookieService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // console.error('HTTP Error:', error);

      if (error.status === 401) {
        console.warn('Unauthorized - refreshing access token...');

        if (isRefreshing) {
          return next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${authService.getAccessToken()}`,
              },
            })
          );
        }

        isRefreshing = true; // Start refreshing

        return authService.refreshAccessToken().pipe(
          switchMap((response: any) => {
            isRefreshing = false;

            // authService.setAccessToken(response.accessToken, response.options);
            return next(
              req.clone({
                setHeaders: {
                  Authorization: `Bearer ${authService.getAccessToken()}`,
                },
              })
            );
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            authService.logout().subscribe((res: any) => {
              router.navigate(['/']);
              return of(null);
            });
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};