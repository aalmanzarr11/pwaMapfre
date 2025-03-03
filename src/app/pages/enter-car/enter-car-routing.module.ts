import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterCarPage } from './enter-car.page';

const routes: Routes = [
  {
    path: '',
    component: EnterCarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterCarPageRoutingModule {}
