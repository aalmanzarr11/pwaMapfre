import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterCarPageRoutingModule } from './enter-car-routing.module';

import { EnterCarPage } from './enter-car.page';
import { IonicPullupModule } from 'ionic-pullup';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EnterCarPageRoutingModule,
    IonicPullupModule
  ],
  declarations: [EnterCarPage]
})
export class EnterCarPageModule {}
