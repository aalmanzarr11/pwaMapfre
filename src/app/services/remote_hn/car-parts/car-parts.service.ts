import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class CarPartsService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getParts() {

    var body = {  
      "token" : this.tokenService.getAuthentication()
    };

    return Observable.create(observer => {
      this.httpClient.post("listaCodigoPartes", body, true).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

}
