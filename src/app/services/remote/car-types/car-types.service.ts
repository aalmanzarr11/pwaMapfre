import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { BaseUrl } from 'src/app/shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CarTypesService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getCarTypes(countryCode: string) {

    var body = null;

    return Observable.create(observer => {
      this.httpClient.post(BaseUrl.getSubparts, body, true).subscribe(
        data => {
          observer.next(data);
          observer.complete();

          // const transformedData = data.data.map(item => ({
          //   ...item,
          //   codigo: item.codigo.toString()
          // }));

          // data.data = transformedData;
          // observer.next(data);
          // observer.complete();
        }
      );
    });
  }

}
