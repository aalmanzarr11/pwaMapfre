import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarInspectionSuccessPage } from './car-inspection-success.page';

const routes: Routes = [
  {
    path: '',
    component: CarInspectionSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarInspectionSuccessPageRoutingModule {}
