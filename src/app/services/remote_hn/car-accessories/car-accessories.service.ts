import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { JsonUtilsService } from '../../infrastructure/json-utils/json-utils.service';
import { TokenService } from '../../infrastructure/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class CarAccessoriesService {
  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getAccessoryCodes() {

    var body = {  
      "token" : this.tokenService.getAuthentication()
    };

    return Observable.create(observer => {
      this.httpClient.post("listaCodigosAccesorios", body, true).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

  public uploadAccessory(accessory : any) {
  
    var body = {  
      "token" : this.tokenService.getAuthentication(),
      "accesorio" : accessory
    };

    return Observable.create(observer => {
      this.httpClient.post("creaModificaAccesorio", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

  public getAccessories(inspection:any) {

    var body = {  
      "llaveInspeccion" : {
        "codCia": "1",
        "numInsp": inspection.numInsp,
        "numSecu": "1",
        "numRiesgo": "1"
      },
      "token" : this.tokenService.getAuthentication()
    };

    return Observable.create(observer => {
      this.httpClient.post("consultarAccesorios", body, false).subscribe(
        data => {

          console.log(data);

          if(data.status && data !== null && data.data !== null && data.data.accesorios !== null){
            data.data.accesorios.forEach(element => {
              JsonUtilsService.cleanNullString(element);
            });
          }

          console.log(data);

          observer.next(data);
          observer.complete();
        }
      );
    });
  }
}
