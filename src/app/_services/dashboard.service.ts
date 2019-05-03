import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertService, AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'
import { User } from '../_models';

@Injectable({ providedIn: 'root' })

export class DashboardService {

    currentUser: User;

    constructor(private http: HttpClient, private authenticationService: AuthenticationService, 
        private router: Router, private alertService: AlertService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    get_all_devices(): Observable<any>{
        let queryURL = `https://${localStorage.getItem('base_url')}/api/1.0/index.php/device-registry/all?access_token=` + this.currentUser.access_token;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let optionsH = {
            headers:headers
        };
        console.log(headers);
        return this.http.get( queryURL, optionsH ).map((res: any) => res);
    }

    get_all_facilities(): Observable<any>{
        let queryURL = `https://${localStorage.getItem('base_url')}/api/1.0/index.php/facility/all?access_token=` + this.currentUser.access_token;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let optionsH = {
            headers:headers
        };
        return this.http.get( queryURL, optionsH ).map((res: any) => res);
    }

    get_all_contacts(): Observable<any>{
        let queryURL = `https://${localStorage.getItem('base_url')}/api/1.0/index.php/contact/all?access_token=` + this.currentUser.access_token;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let optionsH = {
            headers:headers
        };
        return this.http.get( queryURL, optionsH ).map((res: any) => res);
    }

    get_device_by_id(device_id): Observable<any>{
        let queryURL = `https://${localStorage.getItem('base_url')}/api/1.0/index.php/device-registry/${device_id}?access_token=` + this.currentUser.access_token;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let optionsH = {
            headers:headers
        };
        return this.http.get( queryURL, optionsH ).map((res: any) => res);
    }

    get_dashboard_type(type, filter, index = null, dash_type = null):Observable<any>{
        let queryURL = `https://cann-demo-crud.herokuapp.com/index.php/crud/dashboard_data?type=${type}&filter=${filter}&org_id=${localStorage.getItem('org_id')}&contact_id=${localStorage.getItem('contact_id')}`;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let optionsH = {
            headers:headers
        };
        return this.http.get( queryURL, optionsH ).map((res: any) =>{ return {data:res, index, type:dash_type}});
    } 
}