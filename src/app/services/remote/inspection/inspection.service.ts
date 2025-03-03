import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContextService } from "../../infrastructure/context/context.service";
import { HttpClientService } from "../../infrastructure/http-client/http-client.service";
import { TokenService } from "../../infrastructure/token/token.service";
import { String } from 'typescript-string-operations';
import { BaseUrl } from "src/app/shared/baseUrl";

@Injectable({
  providedIn: "root",
})
export class InspectionService {
  constructor(
    private httpClient: HttpClientService,
    private tokenService: TokenService
  ) {
    // console.log("Hello InspectionProvider Provider");
  }

  public getInspectionNumber() { 
    let body = {
      token: this.tokenService.getAuthentication(),
    };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    return Observable.create((observer) => {
      this.httpClient
        .post(String.format(BaseUrl.getInspectionNumber,prefix), body, false)
        .subscribe((data) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  public loadInspectionsV1(document: string, plate: string, policy: string) {
    let body = {
      identificacion: document,
      placa: plate,
      numeroCotizacion: policy
    };

    // console.log('loadInspections body', body);

    return Observable.create((observer) => {
      this.httpClient
        .post(BaseUrl.loadInspectionsV1, body, false)
        .subscribe((data) => {
          if (data.status && data.data !== null) {
            const inspections = data.data.cotizaciones.map((cotizacion: string) => ({
              numeroCotizacion: cotizacion
            }));

            // console.log('inspections', inspections);

            observer.next({ status: true, data: inspections });
            observer.complete();
          } else {
            observer.next({ status: data.status, data: data.error });
            observer.complete();
          }
        });
    });
  }

  public loadInspections(document: string, plate: string, policy: string) {
    let body = {
      identificacion: document,
      placa: plate,
      numeroCotizacion: policy
    };
  
    let filteredBody = {};
    for (let key in body) {
      if (body[key] !== null && body[key] !== "") {
        filteredBody[key] = body[key];
      }
    }

    return Observable.create((observer) => {
      this.httpClient
        .post(BaseUrl.loadInspections, filteredBody, false)
        .subscribe((data) => {
          if (data.status && data.data !== null) {
            const inspections = data.data.map((cotizacion: any) => ({
              numeroCotizacion: cotizacion.presupuesto,
              cotizacionCliente: cotizacion.cotizacionCliente
            }));
  
            observer.next({ status: true, data: inspections });
            observer.complete();
          } else {
            observer.next({ status: data.status, data: data.error });
            observer.complete();
          }
        });
    });
  }

  public loadInspectionDetails(quoteNumber: string) {
    let body = {
      cotizacion: quoteNumber
    };

    return Observable.create((observer) => {
      this.httpClient
        .post(BaseUrl.loadInspectionDetails, body, false)
        .subscribe((data) => {
          if (data.status && data.data !== null) {

            console.log('loadInspectionDetails data', data);

            var result = data.data;
            result.numDocumento = result.numeroDocumento;
            result.suma_asegurada = result.sumaAsegurada;
            result.uso_cod = result.usoCod;
            result.tipo_codigo = result.tipoCodigo; //.toString();
            result.origen_veh = result.origenVeh; 
            result.marca_codigo = result.marcaCodigo.toString();
            result.linea_codigo = result.lineaCodigo.toString();
            result.ciudad_codigo = result.ciudadCodigo;
            result.departamento_codigo = result.departamentoCodigo.toString();
            
            console.log('loadInspectionDetails result', result);

            observer.next({ status: true, data: result });
            observer.complete();
          } else {
            observer.next({ status: data.status, data: data.error });
            observer.complete();
          }
        });
    });
  }

  public uploadInspection(body: any) {
    // let prefix = ContextService.getPrefixAPI();
    // body = ContextService.getBodyAPI(body);
    body = {
      "usuario": body.usuario,
      "numeroDeCotizacion": body.numeroCotizacion,
      "resultado": body.resultado,
      "comentarios": body.comentarios
    };

    return Observable.create((observer) => {
      this.httpClient
        .post(BaseUrl.uploadInspection, body, false)
        .subscribe((data) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  public updateInspection(body: any) {

    var request = {
      "cotizacion": body.numeroCotizacion,
      "placa": body.placa,
      "marca": body.marca,
      "linea": body.linea,
      // "version": "SPORT",
      "modelo": body.modelo,
      "motor": body.motor,
      "chasis": body.vin,
      "serie": body.vin,
      "vin": body.vin,
      "uso": body.uso,
      "tipo": body.tipo,
      "color": body.color,
      // "tipoGas": "GASOLINA",
      "kilometraje": body.kilometraje,
      "anio": body.modelo,
      // "plazas": 5,
      // "tonelaje": 5.4,
      "traccion": body.tracks,
      "origen": body.origen,
      "sumaAsegurada" : body.suma_asegurada // No existe en el servicio
    };

    return Observable.create((observer) => {
      this.httpClient
        .post(BaseUrl.updateInspection, request, false)
        .subscribe((data) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  public getCexper(plate: string, TipUsusario: string) {
    const body = {
      placa: {
        placa: plate,
      },
      tipUsuario: TipUsusario,
      token: this.tokenService.getAuthentication(),
    };

    return Observable.create((observer) => {
      this.httpClient.post(BaseUrl.getCexper, body, false).subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
    });
  }
}