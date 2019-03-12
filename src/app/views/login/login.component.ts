import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    login_url = ["hipaadev.us", "hipaastaging.us", "acceptanceh.us", "hipaacomplete.com"]

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) 
    {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            url: ['', Validators.required],
            organization: ['a0C550000001a0tEAA', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.base_url = this.f.url.value;
        this.authenticationService.login(this.f.organization.value, this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                console.log("logged in");
                this.authenticationService.base_url = this.f.url.value;
                if(data.hasOwnProperty('error')){
                  this.alertService.error(data.error);
                  this.loading = false; 
                }
                else
                {
                    this.router.navigate([this.returnUrl]);
                }
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }
}
