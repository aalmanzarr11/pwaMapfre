import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { CitiesService as CitiesServiceCa } from 'src/app/services/remote_ca/cities/cities.service';
import { CitiesService as CitiesServiceHn } from 'src/app/services/remote_hn/cities/cities.service';
import { ConstantsService } from '../../infrastructure/constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor(
    private citiesServiceCa: CitiesServiceCa,
    private citiesServiceHn: CitiesServiceHn
  ) {}

  private getServiceByCountry() {
    const countryCode = ContextService.location.country;
    return countryCode === ConstantsService.HONDURAS_CODE ? this.citiesServiceHn : this.citiesServiceCa;
  }

  public getCities(countryCode: string, stateCode: string): Observable<any> {
    return this.getServiceByCountry().getCities(countryCode, stateCode);
  }
}