import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalSelectPage } from './modal-select.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalSelectPageRoutingModule {}
