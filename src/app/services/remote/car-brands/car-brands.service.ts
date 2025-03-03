import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { CarBrandsService as CarBrandsServiceCa } from 'src/app/services/remote_ca/car-brands/car-brands.service';
import { CarBrandsService as CarBrandsServiceHn } from 'src/app/services/remote_hn/car-brands/car-brands.service';
import { ConstantsService } from '../../infrastructure/constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CarBrandsService {
  constructor(
    private carBrandsServiceCa: CarBrandsServiceCa,
    private carBrandsServiceHn: CarBrandsServiceHn
  ) {}

  private getServiceByCountry() {
    const countryCode = ContextService.location.country;
    return countryCode === ConstantsService.HONDURAS_CODE ? this.carBrandsServiceHn : this.carBrandsServiceCa;
  }

  public getCarBrands(countryCode: string): Observable<any> {
    return this.getServiceByCountry().getCarBrands(countryCode);
  }

  public getCarBrandLines(brandCode: string, countryCode: string): Observable<any> {
    return this.getServiceByCountry().getCarBrandLines(brandCode, countryCode);
  }
}