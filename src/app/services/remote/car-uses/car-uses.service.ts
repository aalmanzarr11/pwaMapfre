import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { CarUsesService as CarUsesServiceCa } from 'src/app/services/remote_ca/car-uses/car-uses.service';
import { CarUsesService as CarUsesServiceHn } from 'src/app/services/remote_hn/car-uses/car-uses.service';
import { ConstantsService } from '../../infrastructure/constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CarUsesService {
  constructor(
    private carUsesServiceCa: CarUsesServiceCa,
    private carUsesServiceHn: CarUsesServiceHn
  ) {}

  private getServiceByCountry() {
    const countryCode = ContextService.location.country;
    return countryCode === ConstantsService.HONDURAS_CODE ? this.carUsesServiceHn : this.carUsesServiceCa;
  }

  public getCarUses(countryCode: string): Observable<any> {
    return this.getServiceByCountry().getCarUses(countryCode);
  }
}