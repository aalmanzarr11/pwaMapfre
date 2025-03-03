import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { ConfigService } from '../../infrastructure/config/config.service';
import { ConstantsService } from '../../infrastructure/constants/constants.service';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { CrStringsService } from '../../local/cr-strings/cr-strings.service';
import { GtStringsService } from '../../local/gt-strings/gt-strings.service';
import { HnStringsService } from '../../local/hn-strings/hn-strings.service';
import { NiStringsService } from '../../local/ni-strings/ni-strings.service';
import { PaStringsService } from '../../local/pa-strings/pa-strings.service';
import { SvStringsService } from '../../local/sv-strings/sv-strings.service';

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
      this.httpClient.post('leeParametrosAPPV2', body, true).subscribe(
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
      this.httpClient.getTests('https://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=false', true).subscribe(
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

  public getStringsStatic(countryCode: string) {

      let data = null;

      if (countryCode === ConstantsService.PANAMA_CODE) {
        data = PaStringsService.data;
      } 
      else if (countryCode === ConstantsService.GUATEMALA_CODE) {
        data = GtStringsService.data;
      }
      else if (countryCode === ConstantsService.ELSALVADOR_CODE) {
        data = SvStringsService.data;
      }
      else if (countryCode === ConstantsService.HONDURAS_CODE) {
        data = HnStringsService.data; 
      }
      else if (countryCode === ConstantsService.COSTARICA_CODE) {
        data = CrStringsService.data;
      }
      else if (countryCode === ConstantsService.NICARAGUA_CODE) {
        data = NiStringsService.data; 
      }

      console.log("getStringsStatic data", data, countryCode);

      if(data != null) {
        data.servicesURL = ConfigService.apiUrl; //'https://app1.mapfre.com.pa/panama/webapi';
      }
      

      ContextService.location.country = countryCode;
      ConfigService.strings = data;

      return Observable.create(observer => {
        observer.next({ status: true, data: data});
      });
  

  }

  public getConfig(countryCode: string) {

    // TODO: fix path
    var configPath = 'assets/config.json';

    if (countryCode === ConstantsService.HONDURAS_CODE) {
      // configPath = 'assets/hn_config.json';
    }

    return from(fetch(configPath).then(res=>res.json()).then(json=>{

      console.log("OUTPUT: ", json);

      ConfigService.apiUrl = json.servicesURL;
      // ConfigServiceProvider.geonamesUser = json.geonamesUser;

    }));
    
  }

}
