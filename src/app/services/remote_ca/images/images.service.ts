import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}


  public sendCarImages(images : any) {
  
    var body = images;

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    return Observable.create(observer => {
      this.httpClient.post(prefix + "/fotosVehiculo", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });

  }

  public sendCarDamages(image : any) {
  
    var body = [];
    image = ContextService.getBodyAPI(image);
    body.push(image);

    let prefix = ContextService.getPrefixAPI();
    
    return Observable.create(observer => {
      this.httpClient.post(prefix + "/danosVehiculo", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

  public sendCarDocuments(image: any) {
  
    var body = [];
    image = ContextService.getBodyAPI(image);
    body.push(image);

    let prefix = ContextService.getPrefixAPI();
    // body = ContextService.getBodyAPI(body);

    return Observable.create(observer => {
      this.httpClient.post(prefix + "/documentacion", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });

  }

  public sendCarAccessories(image : any) {
  
    var body = [];
    // if(ContextService.location.country != ConstantsProvider.GUATEMALA_CODE){
    //   body = ContextService.getBodyAPI(image);
    // }
    // else{
      image = ContextService.getBodyAPI(image);
      body.push(image);
    // }
    
    let prefix = ContextService.getPrefixAPI();

    return Observable.create(observer => {
      this.httpClient.post(prefix + "/accesoriosVehiculo", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });

  }


  public uploadImage(image : any) {
  
    // var body = {  
    //   "token" : this.tokenService.getAuthentication(),
    //   "foto" : image
    // };

    var body = [];
    image = ContextService.getBodyAPI(image);
    body.push(image);

    let prefix = ContextService.getPrefixAPI();
    

    return Observable.create(observer => {
      this.httpClient.post(prefix + "/fotosVehiculo", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

  public uploadImages(images : any) {
  
    var body = {  
      "token" : this.tokenService.getAuthentication(),
      "foto" : images
    };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    return Observable.create(observer => {
      this.httpClient.post(prefix + "creaFoto", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });

  }

  public getImages(inspection:any, type:string) {

    var body = {  
      "llaveSetFoto" : {
        "codCia": "1",
        "numInsp": inspection.numInsp,
        "numSecu": "1",
        "numRiesgo": "1",
        "tipoFoto": type
     },
      "token" : this.tokenService.getAuthentication()
    };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    return Observable.create(observer => {
      this.httpClient.post(prefix + "consultarSetFoto", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }
}
