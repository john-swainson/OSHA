import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardTypeComponent } from './dashboard_type.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardTypeRoutingModule { }
