import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { CarColorsService as CarColorsServiceCa } from 'src/app/services/remote_ca/car-colors/car-colors.service';
import { CarColorsService as CarColorsServiceHn } from 'src/app/services/remote_hn/car-colors/car-colors.service';
import { ConstantsService } from '../../infrastructure/constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CarColorsService {
  constructor(
    private carColorsServiceCa: CarColorsServiceCa,
    private carColorsServiceHn: CarColorsServiceHn
  ) {}

  private getServiceByCountry() {
    const countryCode = ContextService.location.country;
    return countryCode === ConstantsService.HONDURAS_CODE ? this.carColorsServiceHn : this.carColorsServiceCa;
  }

  public getCarColors(countryCode: string): Observable<any> {
    return this.getServiceByCountry().getCarColors(countryCode);
  }
}