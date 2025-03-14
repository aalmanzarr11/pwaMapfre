import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { ConfigService } from '../../infrastructure/config/config.service'; 
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { CrStringsService } from '../../local/cr-strings/cr-strings.service'; 
import { environment } from 'src/environments/environment';
import { BaseUrl } from 'src/app/shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class StringsService {

  constructor(public httpClient: HttpClientService, private tokenService: TokenService) {}

  public getStrings(countryCode: string) {
    const body = {
      'codPais': countryCode,
      'token' : this.tokenService.getAuthentication()
    };

    // https://sgo.mapfre.com.co/servicios/rest/trnAutoInspecciones/ws/leeParametrosAPPV2
    return Observable.create(observer => {
      this.httpClient.post(BaseUrl.getStrings, body, true).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

  public restTest() {
    const body = {};

    return Observable.create(observer => {
      this.httpClient.getTests(environment.googleMaps, true).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

  // getPanamaCode(){
  //   return 
  // }

  public getStringsStatic( ) { 
      let data = null;

      data = CrStringsService.data;
  
      ConfigService.strings = data;

      //console.log(ConfigService.strings," DATA") 
      return Observable.create(observer => {
        observer.next({ status: true, data: data});
      });
  

  }

  public getConfig() {

    
    //console.log("OUTPUT: ",  environment.urlBase);
    ConfigService.apiUrl = environment.urlBase; 
    
  }

}
