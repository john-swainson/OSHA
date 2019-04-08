import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService, EnterpriseService } from '../../_services';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
    loginForm: FormGroup;
    orgForm: FormGroup;
    loading_org = false;
    submitted_org = false;
    loading = false;
    submitted = false;
    returnUrl: string;
    login_url = ["hipaadev.us", "hipaastaging.us", "acceptanceh.us", "hipaacomplete.com"]
    orgs: any = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        public enterpriseService: EnterpriseService, 
    ) 
    {
        this.toastr.setRootViewContainerRef(vcr);
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.orgForm = this.formBuilder.group({
            url: ['', Validators.required],
            username: ['', Validators.required],
        });

        this.loginForm = this.formBuilder.group({
            organization: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    get f_g() { return this.orgForm.controls; }
    
    onOrgSubmit() {
        this.submitted_org = true;

        // stop here if form is invalid
        if (this.orgForm.invalid) {
            return;
        }

        this.loading_org = true;
        this.authenticationService.base_url = this.f_g.url.value;
        this.orgs = [];
        this.authenticationService.get_org(this.f_g.username.value).subscribe( data=> {
            this.orgs = data;
            this.loading_org = false;
        });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.organization.value, this.f_g.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                if(data.hasOwnProperty('error')){
                  this.alertService.error(data.error);   
                  this.toastr.error(data.error);  
                }
                else
                {
                    this.enterpriseService.get_oauth().subscribe( res => {
                        console.log(res);
                        this.router.navigate([this.returnUrl]);
                    }); 
                }
                this.loading = false; 
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }
}
