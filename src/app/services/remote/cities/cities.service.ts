import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { BaseUrl } from 'src/app/shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getCities(countryCode: string, stateCode: string) {

    var body = {
      "codigo": stateCode
    };

    return Observable.create(observer => {
      this.httpClient.post(BaseUrl.getCities, body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

}
