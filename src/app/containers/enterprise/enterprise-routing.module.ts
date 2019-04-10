import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { EnterpriseComponent } from './enterprise.component';

// Yuri
import { AuthGuard } from '../../_guards';

const routes: Routes = [
  {
    path: '',
    component: EnterpriseComponent,
    data: {
      title: 'Dashboard'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseRoutingModule {}
