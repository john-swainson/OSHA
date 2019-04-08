import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertService, AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'
import { User, Force } from '../_models';
import { environment } from '../../environments/environment';
import { text } from '@angular/core/src/render3';
import { query } from '@angular/animations';

@Injectable({ providedIn: 'root' })

export class EnterpriseService {

    public currentForceSubject: BehaviorSubject<Force>;
    public currentForce: Observable<Force>;

    apiUrl: String = environment.salesforce_url;

    total_fields: String[] =  [ 'Total_Last_Employee_HIPAA_Training__c', 'Total_No_of_Breaches_This_Year__c', 'Total_No_of_Trainings_Due__c',
                                'Total_Number_of_Business_Associates__c', 'Total_Number_of_Unsigned_BAA__c', 'Total_Open_Breach_Incidents__c',
                                'Total_Open_Change_Requests__c', 'Total_Open_Security_Incidents__c', 'Total_Over_500_Breaches__c',  'Total_Under_500_Breaches__c']; 

    constructor(private http: HttpClient, private authenticationService: AuthenticationService, 
        private router: Router, private alertService: AlertService) {

            this.currentForceSubject = new BehaviorSubject<Force>(JSON.parse(localStorage.getItem('forceToken')));
            this.currentForce = this.currentForceSubject.asObservable();
    }

    get_oauth(){
        // const queryString = require('query-string');
        // let queryURL = this.apiUrl + '/oauth2/token';
        // let header = new HttpHeaders();
        // header = header.set('Content-Type', 'application/x-www-form-urlencoded');
        // header = header.set('Accept', 'application/x-www-form-urlencoded');
        // let optionsH = { headers: header };
        // let form = {
        //     grant_type: environment.grant_type, 
        //     client_id: environment.client_id,
        //     client_secret: environment.client_secret, 
        //     username: environment.username,
        //     password: environment.password
        // };

        return this.http.get( 'http://localhost:5000/oauth2/auth' ).map((res: any) => {

            if (res && res.access_token){
                localStorage.setItem('forceToken', JSON.stringify(res));
                this.currentForceSubject.next(res);
            }
            return res;
        });
        // console.log(queryString.stringify(form));
        // jQuery.ajax({
        //     url: "https://hipaacomplete--dev1.cs41.my.salesforce.com/services/oauth2/token",
        //     type: "POST",
        //     data: queryString.stringify(form),
        //     crossDomain: true,
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //         "Accept": "application/json",
        //     },
        //     success: (response) => {
        //         console.log(response); 
        //     },
        //     error: (response) => {
        //         console.log(response);
        //     },
        // });  
    }

    get_children_totals(){
        let force = this.currentForceSubject.value;
        let queryURL = this.apiUrl+'/data/v45.0/queryAll/?q=';
        let parent_selects = 'Id,Name';
        let children_selects = 'Organization__r.Id,Organization__r.Name';
        for(let item of this.total_fields){
            parent_selects += `,${item}`;
            children_selects += `,Organization__r.${item}`;
        }
        queryURL += `SELECT+${parent_selects},(SELECT+${children_selects}+from+partners__r)+FROM+organization_info__c+where+id='${localStorage.getItem('org_id')}'`;

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers = headers.append('Authorization', `Bearer ${force.access_token}`);
        let optionsH = {
            headers:headers
        };
        return this.http.get( queryURL, optionsH ).map((res: any) => res);
    }
}