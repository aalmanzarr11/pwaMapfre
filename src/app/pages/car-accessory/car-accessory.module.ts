import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarAccessoryPageRoutingModule } from './car-accessory-routing.module';

import { CarAccessoryPage } from './car-accessory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarAccessoryPageRoutingModule
  ],
  declarations: [CarAccessoryPage]
})
export class CarAccessoryPageModule {}
