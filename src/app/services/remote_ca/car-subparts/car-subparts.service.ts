import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class CarSubpartsService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getSubparts() {

    let body = {
      'pais' : ContextService.location.country
    };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    console.log('getSubparts body', body);

    return Observable.create(observer => {

      this.httpClient.post(prefix + '/listaPiezas', body, false).subscribe(
        data => {
          // TODO: search locally
          const inspections = [];

          console.log('getSubparts data', data);

          if (data.status && data.data !== null) {
            observer.next({ status: true, data: data.data });
            observer.complete();
          } else {
            observer.next({ status: data.status, data: data.error });
            observer.complete(); 
          }

          // let result = this.storageService.loadInspection(document, plate, this, this.loadCallback);
        }
      );
    });

    // var body = {  
    //   "token" : this.tokenService.getAuthentication()
    // };

    // return Observable.create(observer => {
    //   this.httpClient.post("listaCodigoSubPartes", body, true).subscribe(
    //     data => {
    //       observer.next(data);
    //       observer.complete();
    //     }
    //   );
    // });
  }
}
