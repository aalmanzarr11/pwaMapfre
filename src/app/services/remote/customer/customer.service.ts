import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { BaseUrl } from 'src/app/shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public httpClient : HttpClientService, 
    private tokenService : TokenService) {}

    public getCustomer(codDocum: string, codPlaca: string, tipUsuario: string){
      
      var body = {
         "leeCliente":{
            "codDocum": codDocum,
            "codPlaca": codPlaca,
            "tipUsuario": tipUsuario
          },
          "token": this.tokenService.getAuthentication()
      }

      return Observable.create(observer => {
        this.httpClient.post(BaseUrl.getCustomer, body, false).subscribe(
          data => {
            observer.next(data);
            observer.complete();
          }
        );
      });
    }

}
