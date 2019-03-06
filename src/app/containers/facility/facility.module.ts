import { NgModule }                           from '@angular/core';
import { CommonModule }                       from '@angular/common';
import { FacilityRoutingModule }              from './facility-routing.module';
import { FacilityComponent }                  from './facility.component';
import { DataTablesModule }                   from 'angular-datatables';
import { NgxLoadingModule }                   from 'ngx-loading';
import { NgbModule }                          from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

//Material Module
import {MatDatepickerModule,}                 from '@angular/material/datepicker';
import {MatNativeDateModule}                  from '@angular/material'
import {MatButtonModule}                      from '@angular/material/button';
import { MatFormFieldModule }                 from '@angular/material/form-field';
import { MatInputModule }                     from '@angular/material/input';
import {MatIconModule}                        from '@angular/material/icon';
 
@NgModule({
  imports: [
    CommonModule,
    FacilityRoutingModule,
    DataTablesModule,
    NgxLoadingModule.forRoot({}),
    NgbModule.forRoot( ),
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [  
    MatDatepickerModule,  
    MatButtonModule,
  ],
  exports:[
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [FacilityComponent]
})
export class FacilityModule { }

