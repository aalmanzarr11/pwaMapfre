import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptInspectionPageRoutingModule } from './accept-inspection-routing.module';

import { AcceptInspectionPage } from './accept-inspection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AcceptInspectionPageRoutingModule
  ],
  declarations: [AcceptInspectionPage]
})
export class AcceptInspectionPageModule {}
