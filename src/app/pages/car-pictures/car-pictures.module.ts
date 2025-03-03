import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarPicturesPageRoutingModule } from './car-pictures-routing.module';

import { CarPicturesPage } from './car-pictures.page';
import { IonicPullupModule } from 'ionic-pullup';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarPicturesPageRoutingModule,
    IonicPullupModule
  ],
  declarations: [CarPicturesPage]
})
export class CarPicturesPageModule {}
