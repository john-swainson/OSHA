import { NgModule }                           from '@angular/core';
import { CommonModule }                       from '@angular/common';
import { FacilityRoutingModule }              from './facility-routing.module';
import { FacilityComponent }                  from './facility.component';
import { DataTablesModule }                   from 'angular-datatables';
import { NgxLoadingModule }                   from 'ngx-loading';
import { NgbModule }                          from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {ToastModule} from 'ng6-toastr';

@NgModule({
  imports: [
    CommonModule,
    FacilityRoutingModule,
    DataTablesModule,
    NgxLoadingModule.forRoot({}),
    NgbModule.forRoot( ),
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
  ],
  declarations: [FacilityComponent]
})
export class FacilityModule { }

