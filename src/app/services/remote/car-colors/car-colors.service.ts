import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { BaseUrl } from 'src/app/shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CarColorsService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getCarColors(countryCode: string) {

    var body = null;

    return Observable.create(observer => {
      this.httpClient.post(BaseUrl.getCarColors, body, true).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }
}
