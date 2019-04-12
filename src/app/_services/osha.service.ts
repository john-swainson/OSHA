import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertService, AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { User } from '../_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class OshaService {

    currentUser: User;
    loading_submit: boolean = false;
    error_alert: string = '';
    success_alert: string = '';
    current_dashboard_type_subject = new BehaviorSubject<string>({} as string);
    current_dashboard_type = this.current_dashboard_type_subject.asObservable().pipe(distinctUntilChanged());

    constructor(private http: HttpClient, private authenticationService: AuthenticationService, 
        private router: Router, private alertService: AlertService, private modalService: NgbModal) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    get_object_fields(tableName, index = null, type = null): Observable<any>{
        let queryURL = `https://cann-demo-crud.herokuapp.com/index.php/crud?tableName=${tableName}`;
        let headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        let optionsH = {
            headers:headers
        };
        return this.http.get( queryURL, optionsH ).map((res: any) => { return { fields:res, index, type }});
    }

    get_objects(api_url, index = null, type = null): Observable<any>{
        let queryURL = `https://${localStorage.getItem('base_url')}/api/1.0/index.php/${api_url}/all?access_token=` + this.currentUser.access_token;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let optionsH = {
            headers:headers
        };
        return this.http.get( queryURL, optionsH ).map((res: any) => { return {...res, index, type} });
    }

    add_object(form, api_url): Observable<any> {
        let body = {base_url: localStorage.getItem('base_url'), api_url: api_url, access_token: this.currentUser.access_token, form: JSON.stringify(form)}
        return this.http.post( `${environment.server_url}/hipaa/create`, body).map((res: any) => res)
    }
    update_object(form, api_url): any {

        let body = {base_url: localStorage.getItem('base_url'), api_url: api_url, access_token: this.currentUser.access_token, form: JSON.stringify(form)}
        return this.http.post( `${environment.server_url}/hipaa/update`, body).map((res: any) => res)
    }
    delete_object(id, api_url){

        let body = {base_url: localStorage.getItem('base_url'), api_url: api_url, access_token: this.currentUser.access_token, id: id}
        return this.http.post( `${environment.server_url}/hipaa/delete`, body).map((res: any) => res)
    }
}