import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public base_url: string;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(organization: string, username: string, password: string): Observable<any> {
        const body = new HttpParams()
            .set('org_id', organization)
            .set('username', username)
            .set('password', password);
        return this.http.post<any>(`https://${this.base_url}/api/1.0/login.php`,body.toString(), 
            { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('org_id', organization);
                    localStorage.setItem('base_url', this.base_url);
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    get_org(email: string) {
        let queryURL = `https://cann-demo-crud.herokuapp.com/index.php/crud/orgs_by_email?email=${email}`;
        let headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        let optionsH = {
            headers:headers
        };
        return this.http.get( queryURL, optionsH ).map((res: any) => res);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}