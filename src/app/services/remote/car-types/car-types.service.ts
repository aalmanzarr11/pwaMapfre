import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { CarTypesService as CarTypesServiceCa } from 'src/app/services/remote_ca/car-types/car-types.service';
import { CarTypesService as CarTypesServiceHn } from 'src/app/services/remote_hn/car-types/car-types.service';
import { ConstantsService } from '../../infrastructure/constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CarTypesService {
  constructor(
    private carTypesServiceCa: CarTypesServiceCa,
    private carTypesServiceHn: CarTypesServiceHn,
    private httpClient: HttpClientService,
    private tokenService: TokenService
  ) {}

  private getServiceByCountry() {
    const countryCode = ContextService.location.country;
    return countryCode === ConstantsService.HONDURAS_CODE ? this.carTypesServiceHn : this.carTypesServiceCa;
  }

  public getCarTypes(countryCode: string): Observable<any> {
    return this.getServiceByCountry().getCarTypes(countryCode);
  }
  
}