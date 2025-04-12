import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_URL = environment.API_URL;

  constructor(private httpClient: HttpClient) { }

  get(url: string, query?: any): Observable<any> {
    const httpParam: HttpParams = new HttpParams({ fromObject: query });
    return this.httpClient.get<any>(`${this.API_URL}/${url}`, { params: httpParam });
  }

  post(url: string, body: any): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/${url}`, body);
  }

  secureGet(url: string, query?: any): Observable<any> {
    const httpParam: HttpParams = new HttpParams({ fromObject: query });
    return this.httpClient.get<any>(`${this.API_URL}/${url}`, { params: httpParam });
  }

  securePost(url: string, body: any): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/${url}`, body);
  }

  securePut(url: string, updatedBody: any): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/${url}`, updatedBody);
  }

  secureDelete(url: string, query?: any): Observable<any> {
    const httpParam: HttpParams = new HttpParams({ fromObject: query });
    return this.httpClient.delete<any>(`${this.API_URL}/${url}`, { params: httpParam });
  }

  unsubscribe(subscription: Subscription) {
    if (subscription) subscription.unsubscribe();
  }
}