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

    let body = null;

    return Observable.create(observer => {

      this.httpClient.post('/Info/Piezas', body, false).subscribe(
        data => {
          // const inspections = [];

          if (data.status && data.data !== null) {

            const transformedData = data.data.map(item => ({
              codigo: item.codigo,
              nombrePieza: item.nombre
            }));

            observer.next({ status: true, data: transformedData });
            observer.complete();
          } else {
            observer.next({ status: data.status, data: data.error });
            observer.complete(); 
          }
        }
      );
    });
  }
}
