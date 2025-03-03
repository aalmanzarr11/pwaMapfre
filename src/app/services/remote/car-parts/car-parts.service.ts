import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { BaseUrl } from 'src/app/shared/baseUrl';

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
      this.httpClient.post(BaseUrl.getParts, body, true).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

}
