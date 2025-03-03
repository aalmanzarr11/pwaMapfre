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
      this.httpClient.post(prefix + "/Inspeccion/EnvioFotoVehiculo", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });

  }

  public sendCarDamages(image : any) {
  
    var body = [];
    // image = ContextService.getBodyAPI(image);
    image = {
      "numeroCotizacion": image.numeroCotizacion,
      "pieza": image.pieza,
      "nivelDaño": image.nivelDano,
      "valor": image.valor,
      "byteFoto": image.byteFoto
    };
    body.push(image);

    // let prefix = ContextService.getPrefixAPI();
    
    return Observable.create(observer => {
      this.httpClient.post("/Inspeccion/DanosVehiculo", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

  public sendCarDocuments(image: any) {
  
    var body = [];
    image = {
      "numeroCotizacion": image.numeroCotizacion,
      "tipoDocumento": image.tipoDocumento,
      "byteFoto": image.byteFoto
    };
    body.push(image);

    return Observable.create(observer => {
      this.httpClient.post("/Inspeccion/DocumentacionSolicitada", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });

  }

  public sendCarAccessories(image : any) {
  
    var body = [];
    image = ContextService.getBodyAPI(image);
    body.push(image);

    return Observable.create(observer => {
      this.httpClient.post("/Inspeccion/AccesoriosVehiculo", body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });

  }


  public uploadImage(image : any) {
    var body = [];
    image = {
      "numeroCotizacion": image.numeroCotizacion,
      "tipoFoto": image.tipoFoto,
      "byteFoto": image.byteFoto
    };
    body.push(image);

    return Observable.create(observer => {
      this.httpClient.post("/Inspeccion/EnvioFotoVehiculo", body, false).subscribe(
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
