import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerDataPageRoutingModule } from './customer-data-routing.module';

import { CustomerDataPage } from './customer-data.page';
import { IonicPullupModule } from 'ionic-pullup';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CustomerDataPageRoutingModule,
    IonicPullupModule
  ],
  declarations: [CustomerDataPage]
})
export class CustomerDataPageModule {}
