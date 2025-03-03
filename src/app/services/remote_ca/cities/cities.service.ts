import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getCities(countryCode: string, stateCode: string) {

    var body = {
      "pais": countryCode,
      "codigo": stateCode
    };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    return Observable.create(observer => {
      this.httpClient.post(prefix + "/listaMunicipios", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

}
