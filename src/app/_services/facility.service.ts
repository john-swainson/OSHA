import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertService, AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { User } from '../_models';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })

export class FacilityService {

    currentUser: User;
    facilites: any;
    facility_ids: Array<string> = [];
    is_loading: boolean = true;

    constructor(private http: HttpClient, private authenticationService: AuthenticationService, 
        private router: Router, private alertService: AlertService, private modalService: NgbModal) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.render_facility();
    }

    render_facility(){
        this.is_loading = true;
        this.get_facilities().subscribe( res => {
            this.facilites = res; 
            this.facility_ids = [];
            for(var key in res.data) {
                this.facility_ids.push(key);
                if(this.facilites.data[key].Active == "true")
                    this.facilites.data[key].Active = 1
                else
                    this.facilites.data[key].Active = 0    
            }
            console.log(this.facilites);
            this.is_loading = false;
            var script = document.createElement('script');
            script.src = '/assets/js/resize.js';
            document.head.appendChild(script); 
        })
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
                    this.render_facility();
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
        // let queryURL = `https://hipaadev.us/api/1.0/index.php/facility?access_token=` + this.currentUser.access_token;
        // let headers = new HttpHeaders();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Accept', 'application/json');
        // let optionsH = {
        //     headers:headers
        // };
        // return this.http.post( queryURL, form, optionsH ).map((res: any) => res);
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
                    this.render_facility();
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