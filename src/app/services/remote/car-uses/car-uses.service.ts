import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { BaseUrl } from 'src/app/shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CarUsesService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getCarUses(countryCode: string) {

    var body = null;

    return Observable.create(observer => {
      this.httpClient.post(BaseUrl.getCarUses, body, true).subscribe(
        data => {

          data.data = data.data.filter(item => item.codigo === 1 || item.codigo === 2);

          observer.next(data);
          observer.complete();
        }
      );
    });
  }

}
