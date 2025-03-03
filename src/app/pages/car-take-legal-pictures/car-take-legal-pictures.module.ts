import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarTakeLegalPicturesPageRoutingModule } from './car-take-legal-pictures-routing.module';

import { CarTakeLegalPicturesPage } from './car-take-legal-pictures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarTakeLegalPicturesPageRoutingModule
  ],
  declarations: [CarTakeLegalPicturesPage]
})
export class CarTakeLegalPicturesPageModule {}
