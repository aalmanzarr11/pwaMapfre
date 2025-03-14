import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { BaseUrl } from 'src/app/shared/baseUrl';
import { PartsResponse } from 'src/app/shared/Dtos/Responses/partsResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class CarSubpartsService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getSubparts():Observable<PartsResponse>{

    let body = null;

    return Observable.create(observer => {

      this.httpClient.post(BaseUrl.getSubparts, body, false).subscribe(
        data => {
          // const inspections = [];
          observer.next(data);
            observer.complete(); 
          
        }
      );
    });
  }
}
