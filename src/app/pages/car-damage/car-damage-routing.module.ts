import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarDamagePage } from './car-damage.page';

const routes: Routes = [
  {
    path: '',
    component: CarDamagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarDamagePageRoutingModule {}
