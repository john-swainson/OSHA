import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertService, AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { User } from '../_models';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })

export class OshaService {

    currentUser: User;

    constructor(private http: HttpClient, private authenticationService: AuthenticationService, 
        private router: Router, private alertService: AlertService, private modalService: NgbModal) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    get_object_fields(tableName): Observable<any>{
        let queryURL = `https://fierce-atoll-29878.herokuapp.com/index.php/crud?tableName=${tableName}`
        return this.http.get( queryURL ).map((res: any) => res);
    }

    get_facilities(): Observable<any>{
        let queryURL = `https://hipaadev.us/api/1.0/index.php/facility/all?access_token=` + this.currentUser.access_token;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let optionsH = {
            headers:headers
        };
        return this.http.get( queryURL, optionsH ).map((res: any) => res);
    }

    add_facility(form): any {
        jQuery.ajax({
            url: `https://hipaadev.us/api/1.0/index.php/facility?access_token=` + this.currentUser.access_token,
            type: "POST",
            data: JSON.stringify(form),
            dataType: "json",
            headers: {          
                Accept: "application/json; charset=utf-8",
                //"Content-Type": "application/json; charset=utf-8"   
            },
            success: (response) => {
                response = response[0];
                
                if(response['status'] == "success")
                {
                    alert(response['message']);
                    this.modalService.dismissAll();
                }  
                else if (response['status'] == "error")
                {
                    alert(response['message']);
                }
            },
            error: (response) => {
                this.alertService.error(response['message']);
            }
        });
    }
    update_facility(form): any {
        jQuery.ajax({
            url: `https://hipaadev.us/api/1.0/index.php/facility/?access_token=` + this.currentUser.access_token,
            type: "POST",
            data: JSON.stringify(form),
            dataType: "json",
            headers: {          
                Accept: "application/json; charset=utf-8",
                //"Content-Type": "application/json; charset=utf-8"   
            },
            success: (response) => {
                response = response[0];
                
                if(response['status'] == "success")
                {
                    alert(response['message']);
                    this.modalService.dismissAll();
                }  
                else if(response['status'] == "error")
                {
                    alert(response['message']);
                }
            },
            error: (response) => {
                this.alertService.error(response['message']);
            }
        });
    }
    delete_facility(id){
        jQuery.ajax({
            url: `https://hipaadev.us/api/1.0/index.php/facility/${id}?access_token=` + this.currentUser.access_token,
            type: "DELETE",
            contentType: 'application/json',
            crossDomain: false,
            headers: {          
                Accept: 'application/json',
                // 'Content-Type': 'application/json'
            },
            success: (response) => {
                alert("adsf");
            },
            error: (response) => {
                this.alertService.error(response['message']);
            }
        });
    }
}