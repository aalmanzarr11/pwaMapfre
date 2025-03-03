import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarMoreLegalPicturesPage } from './car-more-legal-pictures.page';

const routes: Routes = [
  {
    path: '',
    component: CarMoreLegalPicturesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarMoreLegalPicturesPageRoutingModule {}
