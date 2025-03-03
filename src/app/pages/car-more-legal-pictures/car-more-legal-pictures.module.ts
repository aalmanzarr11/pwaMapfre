import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarMoreLegalPicturesPageRoutingModule } from './car-more-legal-pictures-routing.module';

import { CarMoreLegalPicturesPage } from './car-more-legal-pictures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarMoreLegalPicturesPageRoutingModule
  ],
  declarations: [CarMoreLegalPicturesPage]
})
export class CarMoreLegalPicturesPageModule {}
