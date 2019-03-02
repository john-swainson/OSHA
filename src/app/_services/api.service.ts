import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { throwError } from 'rxjs/';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }
  get(path: string, params: HttpParams ): Observable<any> {
    let headers=
    new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('X-ACCESS-TOKEN', 'ng');
     console.log("params"+JSON.stringify(params));
 
     let optionsH = {
     headers:headers
     };
    return this.http.get(`${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }
  
  put(path: string, body: Object = {}): Observable<any> {
    let headers=
    new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('X-ACCESS-TOKEN', 'ng');
  
     let optionsH = {
     headers:headers
     };
    return this.http.put(
      `${path}`,
      JSON.stringify(body),optionsH
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let optionsH = {
     headers:headers
     };
    return this.http.post(
      `${path}`,
      JSON.stringify(body),optionsH
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    let headers=
    new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('X-ACCESS-TOKEN', 'ng');
  
 
     let optionsH = {
     headers:headers
     };
    return this.http.delete(
      `${path}`,optionsH
    ).pipe(catchError(this.formatErrors));
  }
}
