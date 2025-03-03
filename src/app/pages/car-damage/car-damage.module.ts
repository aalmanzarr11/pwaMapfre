import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarDamagePageRoutingModule } from './car-damage-routing.module';

import { CarDamagePage } from './car-damage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarDamagePageRoutingModule
  ],
  declarations: [CarDamagePage]
})
export class CarDamagePageModule {}
