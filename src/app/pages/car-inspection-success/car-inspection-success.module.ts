import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarInspectionSuccessPageRoutingModule } from './car-inspection-success-routing.module';

import { CarInspectionSuccessPage } from './car-inspection-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarInspectionSuccessPageRoutingModule
  ],
  declarations: [CarInspectionSuccessPage]
})
export class CarInspectionSuccessPageModule {}
