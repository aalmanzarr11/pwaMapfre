import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarAccessoryPage } from './car-accessory.page';

const routes: Routes = [
  {
    path: '',
    component: CarAccessoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarAccessoryPageRoutingModule {}
