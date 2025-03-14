import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { BaseUrl } from 'src/app/shared/baseUrl';
import { String } from 'typescript-string-operations';
import { VehiclePhotoRequest } from 'src/app/shared/Dtos/Requests/vehiclePhotoRequest.dto';
import { DocumentationRequest } from 'src/app/shared/Dtos/Requests/DocumentationRequest.dto';
import { DamageRequest } from 'src/app/shared/Dtos/Requests/DamageRequest.dto';
import { AccesoryRequest } from 'src/app/shared/Dtos/Requests/AccesoryRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {}


  public sendCarImages(images : VehiclePhotoRequest[]) {
   

    return Observable.create(observer => {
      this.httpClient.post(BaseUrl.sendCarImages, images, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });

  }

  public sendCarDamages(image : DamageRequest[]) {
   

    // let prefix = ContextService.getPrefixAPI();
    
    return Observable.create(observer => {
      this.httpClient.post(BaseUrl.sendCarDamages, image, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }

  public sendCarDocuments(image: DocumentationRequest) {
  
    var body = []; 
    body.push(image);

    return Observable.create(observer => {
      this.httpClient.post(BaseUrl.sendCarDocuments, body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });

  }

  public sendCarAccessories(image : AccesoryRequest) {
  
    var body = []; 
    body.push(image);

    return Observable.create(observer => {
      this.httpClient.post(BaseUrl.sendCarAccessories, body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });

  }


  public uploadImage(image : VehiclePhotoRequest) {
    var body = []; 
    body.push(image);

    return Observable.create(observer => {
      this.httpClient.post(BaseUrl.uploadImage, body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }
 
/*
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
      this.httpClient.post(String.format(BaseUrl.getImages,prefix), body, false).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        }
      );
    });
  }*/
}
