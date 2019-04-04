import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertService, AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'
import { User } from '../_models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class EnterpriseService {

    currentUser: User;
    apiUrl: String = environment.salesforce_url;

    constructor(private http: HttpClient, private authenticationService: AuthenticationService, 
        private router: Router, private alertService: AlertService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    get_oauth(){
        const queryString = require('query-string');
        let queryURL = this.apiUrl + '/oauth2/token';
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let optionsH = { headers:headers };
        let form = {'grant_type': environment.grant_type, 'client_id': environment.client_id,
                    'client_secret': environment.client_secret, 'username': environment.username,
                    'password': environment.password};

        // return this.http.post( queryURL, queryString.stringify(form), optionsH ).map((res: any) => res);
        jQuery.ajax({
            url: queryURL,
            type: "POST",
            data: queryString.stringify(form),
            dataType: "json",
            headers: {         
                "Content-Type": "application/x-www-form-urlencoded"   
            },
            success: (response) => {
               console.log(response); 
            },
            error: (response) => {
               
            }
        });
    }
}