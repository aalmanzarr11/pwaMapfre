import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { CarSubpartsService as CarSubpartsServiceCa } from 'src/app/services/remote_ca/car-subparts/car-subparts.service';
import { CarSubpartsService as CarSubpartsServiceHn } from 'src/app/services/remote_hn/car-subparts/car-subparts.service';
import { ConstantsService } from '../../infrastructure/constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CarSubpartsService {
  constructor(
    private carSubpartsServiceCa: CarSubpartsServiceCa,
    private carSubpartsServiceHn: CarSubpartsServiceHn
  ) {}

  private getServiceByCountry() {
    const countryCode = ContextService.location.country;
    return countryCode === ConstantsService.HONDURAS_CODE ? this.carSubpartsServiceHn : this.carSubpartsServiceCa;
  }

  public getSubparts(): Observable<any> {
    return this.getServiceByCountry().getSubparts();
  }
}