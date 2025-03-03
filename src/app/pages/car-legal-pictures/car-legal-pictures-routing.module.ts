import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarLegalPicturesPage } from './car-legal-pictures.page';

const routes: Routes = [
  {
    path: '',
    component: CarLegalPicturesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarLegalPicturesPageRoutingModule {}
