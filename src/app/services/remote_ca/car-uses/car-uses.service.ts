import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class CarUsesService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getCarUses(countryCode: string) {

    var body = {  
      "pais": countryCode
    };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    return Observable.create(observer => {
      this.httpClient.post(prefix + "/listaUsoVehiculo", body, true).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

}
