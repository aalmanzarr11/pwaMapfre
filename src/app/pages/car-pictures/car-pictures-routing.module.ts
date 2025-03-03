import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarPicturesPage } from './car-pictures.page';

const routes: Routes = [
  {
    path: '',
    component: CarPicturesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarPicturesPageRoutingModule {}
