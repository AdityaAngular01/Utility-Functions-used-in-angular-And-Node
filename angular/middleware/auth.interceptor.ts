//@ts-ignore
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
//@ts-ignore
import { catchError, switchMap } from 'rxjs/operators';
//@ts-ignore
import { throwError, Observable, of } from 'rxjs';
//@ts-ignore
import { inject } from '@angular/core';
//@ts-ignore
import { AuthService } from '../service/http/auth/auth.service';
//@ts-ignore
import { Router } from '@angular/router';
//@ts-ignore
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