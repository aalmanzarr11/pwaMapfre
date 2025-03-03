import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { StatesService as StatesServiceCa } from 'src/app/services/remote_ca/states/states.service';
import { StatesService as StatesServiceHn } from 'src/app/services/remote_hn/states/states.service';
import { ConstantsService } from '../../infrastructure/constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  constructor(
    private statesServiceCa: StatesServiceCa,
    private statesServiceHn: StatesServiceHn
  ) {}

  private getServiceByCountry() {
    const countryCode = ContextService.location.country;
    return countryCode === ConstantsService.HONDURAS_CODE ? this.statesServiceHn : this.statesServiceCa;
  }

  public getStates(countryCode: string): Observable<any> {
    return this.getServiceByCountry().getStates(countryCode);
  }
}