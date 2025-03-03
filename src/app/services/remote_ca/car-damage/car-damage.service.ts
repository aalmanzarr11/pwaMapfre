import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { JsonUtilsService } from '../../infrastructure/json-utils/json-utils.service';
import { TokenService } from '../../infrastructure/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class CarDamageService {
  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}

  public getDamageLevels() {

    var body = {  
      "token" : this.tokenService.getAuthentication()
    };

    return Observable.create(observer => {
      this.httpClient.post("listaCodigoDanos", body, true).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

  public uploadDamage(damage : any) {
  
    var body = {  
      "token" : this.tokenService.getAuthentication(),
      "dano" : damage
    };

    return Observable.create(observer => {
      this.httpClient.post("creaModificaDano", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

  public getDamages(inspection:any) {

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
      this.httpClient.post("consultarDanos", body, false).subscribe(
        data => {

          console.log(data);

          if(data.status && data !== null && data.data !== null && data.data.danos !== null){
            data.data.danos.forEach(element => {
              JsonUtilsService.cleanNullString(element);
            });
          }

          // console.log(data);

          observer.next(data);
          observer.complete();
        }
      );
    });
  }
}
