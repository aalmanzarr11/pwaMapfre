import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarAccessoriesPage } from './car-accessories.page';

const routes: Routes = [
  {
    path: '',
    component: CarAccessoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarAccessoriesPageRoutingModule {}
