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

    total_fields: String[] =  [ 'Total_No_of_Breaches_This_Year__c', 'Total_No_of_Trainings_Due__c',
                                'Total_Number_of_Business_Associates__c', 'Total_Number_of_Unsigned_BAA__c', 'Total_Open_Breach_Incidents__c',
                                'Total_Open_Change_Requests__c', 'Total_Open_Security_Incidents__c', 'Total_Over_500_Breaches__c',  'Total_Under_500_Breaches__c'] 

    enterprise_fields: String[] =  [ 'Last_Employee_HIPAA_Training__c', 'No_of_Breaches_This_Year__c', 'No_of_Trainings_Due__c',
                                'Number_of_Business_Associates__c', 'Number_of_Unsigned_BAA__c', 'Open_Breach_Incidents__c',
                                'Open_Change_Requests__c', 'Open_Security_Incidents__c', 'Over_500_Breaches__c',  'Under_500_Breaches__c']

    constructor(private http: HttpClient, private authenticationService: AuthenticationService, 
        private router: Router, private alertService: AlertService) {

            this.currentForceSubject = new BehaviorSubject<Force>(JSON.parse(localStorage.getItem('forceToken')));
            this.currentForce = this.currentForceSubject.asObservable();
    }

    get_oauth(){
        return this.http.get( `${environment.server_url}/oauth2/auth` ).map((res: any) => {

            if (res && res.access_token){
                localStorage.removeItem('forceToken');
                localStorage.setItem('forceToken', JSON.stringify(res));
                this.currentForceSubject.next(res);
            }
            return res;
        });
    }

    get_children_totals(child_org_id){
        if(child_org_id == '')
            child_org_id = localStorage.getItem('org_id')

        let force = this.currentForceSubject.value

        let queryURL = ''
        let parent_selects = 'Id,Name'
        let children_selects = 'Organization__r.Id,Organization__r.Name'
        for(let item of this.total_fields){
            parent_selects += `,${item}`
            children_selects += `,Organization__r.${item}`
        }
        for(let item of this.enterprise_fields){
            parent_selects += `,${item}`
            children_selects += `,Organization__r.${item}`
        }

        queryURL = `SELECT+${parent_selects},(SELECT+${children_selects}+from+partners__r)+FROM+organization_info__c+where+id='${child_org_id}'`

        let body = {query: queryURL, access_token: force.access_token}
        return this.http.post( `${environment.server_url}/force/queryALL`, body ).map((res: any) => res)
    }

    get_breadcrumb_path(child_id, parent_id){
        let force = this.currentForceSubject.value

        let body = {childid: child_id, parentid: parent_id, access_token: force.access_token}
        return this.http.post( `${environment.server_url}/force/getbreadcrumb`, body).map((res: any) => res) 
    }
}