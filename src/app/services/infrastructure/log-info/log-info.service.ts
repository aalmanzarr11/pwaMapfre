import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../context/context.service';
import { HttpClientService } from '../http-client/http-client.service';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class LogInfoService  {

  constructor(public httpClient: HttpClientService, private tokenService : TokenService) {
    // ContextService.init();
  }

  public createLogInfo(paso:string, placa:string, numInsp:string, nomUsuario:string) {

    var body = {  
      "token" : this.tokenService.getAuthentication(),
      "log" : {  
        "paso"        : paso, 
        "fecha"       : new Date(),
        "placa"       : placa,
        "numInsp"     : numInsp,
        "nomUsuario"  : nomUsuario,
        "tipUsuario"  : this.getUserType(),
        "IP"          : "10.10.101"
      }
      
    };
  
      return Observable.create(observer => {
        this.httpClient.post("grabaLog", body, false).subscribe(
          data => {
            observer.next(data);
            observer.complete();
          }
        );
      });
    }

    public getUserType():string{
      if(!ContextService.userSession.tipUsuario){
        return "C";
      }else{
        return ContextService.userSession.tipUsuario;
      }
    }
    
    public getIp():string{
      return "";
    }

}