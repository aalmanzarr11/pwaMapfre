import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarAccessoriesPageRoutingModule } from './car-accessories-routing.module';

import { CarAccessoriesPage } from './car-accessories.page';
import { IonicPullupModule } from 'ionic-pullup';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarAccessoriesPageRoutingModule,
    IonicPullupModule
  ],
  declarations: [CarAccessoriesPage]
})
export class CarAccessoriesPageModule {}
