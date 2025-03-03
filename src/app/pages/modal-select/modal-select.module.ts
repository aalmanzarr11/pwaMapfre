import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSelectPageRoutingModule } from './modal-select-routing.module';

import { ModalSelectPage } from './modal-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSelectPageRoutingModule
  ],
  declarations: [ModalSelectPage]
})
export class ModalSelectPageModule {}
