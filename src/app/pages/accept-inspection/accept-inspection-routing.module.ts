import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptInspectionPage } from './accept-inspection.page';

const routes: Routes = [
  {
    path: '',
    component: AcceptInspectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceptInspectionPageRoutingModule {}
