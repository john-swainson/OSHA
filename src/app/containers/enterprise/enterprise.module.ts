import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { EnterpriseComponent } from './enterprise.component';
import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { CommonModule } from '@angular/common';  
import { DataTablesModule } from 'angular-datatables';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EnterpriseRoutingModule,
    ChartsModule,
    BsDropdownModule,
    DataTablesModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ EnterpriseComponent ]
})
export class EnterpriseModule { }
