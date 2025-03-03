import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarLegalPicturesPageRoutingModule } from './car-legal-pictures-routing.module';

import { CarLegalPicturesPage } from './car-legal-pictures.page';
import { IonicPullupModule } from 'ionic-pullup';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarLegalPicturesPageRoutingModule,
    IonicPullupModule
  ],
  declarations: [CarLegalPicturesPage]
})
export class CarLegalPicturesPageModule {}
