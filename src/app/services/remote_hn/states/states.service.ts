import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getStates(countryCode: string) {

    var body = null;

    return Observable.create(observer => {
      this.httpClient.post("/Info/Departamentos", body, true).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

}
