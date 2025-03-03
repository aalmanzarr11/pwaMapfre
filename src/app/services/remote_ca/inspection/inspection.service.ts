import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContextService } from "../../infrastructure/context/context.service";
import { HttpClientService } from "../../infrastructure/http-client/http-client.service";
import { TokenService } from "../../infrastructure/token/token.service";

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
        .post(prefix + "/numeroInspeccion", body, false)
        .subscribe((data) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  public loadInspections(document: string, plate: string, policy: string) {
    // TODO: tener en cuenta la póliza para los criterios de búsqueda

    let body = {
      usuario: ContextService.userSession.nomUsuario,
      tipUsuario: ContextService.userSession.userTypeName,
      identificacion: document,
      placa: plate,
      numeroCotizacion: policy,
      pais: ContextService.location.country,
    };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    console.log('loadInspections body', body);

    // const body = {
    //   'token' : this.tokenService.getAuthentication(),
    //   'consultaInspeccion': {}
    // };

    // if (documentType) {
    //   body['consultaInspeccion']['tipDocum'] = documentType;
    // }

    // if (document) {
    //   body['consultaInspeccion']['codDocum'] = document;
    // }

    // if (plate) {
    //   body['consultaInspeccion']['codPlaca'] = plate;
    // }

    // if (inspectorCode) {
    //   body['consultaInspeccion']['codInspector'] = inspectorCode;
    // }

    // if (countryId) {
    //   body['consultaInspeccion']['codPais'] = countryId;
    // }

    // if (stateId) {
    //   body['consultaInspeccion']['codProv'] = stateId;
    // }

    // if (cityId) {
    //   body['consultaInspeccion']['codLocalidad'] = cityId;
    // }

    return Observable.create((observer) => {
      let prefix = ContextService.getPrefixAPI();
      body = ContextService.getBodyAPI(body);

      this.httpClient
        .post(prefix + "/buscarCotizacionesCliente", body, false)
        .subscribe((data) => {
          // TODO: search locally
          const inspections = [];

          // console.log(data);

          if (data.status && data.data !== null) {
            // for (const inspection of data.data.inspecciones) {

            //   const risks = data.data.riesgos ? data.data.riesgos.filter(item => {
            //     return item['numInsp'] === String(inspection.numInsp);
            //   }) : [];

            //   const customers = data.data.clientes ? data.data.clientes.filter(item => {
            //     return item['numInsp'] === String(inspection.numInsp);
            //   }) : [];

            //   const risk = risks.length > 0 ? risks[0] : null;
            //   const customer = customers.length > 0 ? customers[0] : null;

            //   JsonUtilsProvider.cleanNullString(inspection);
            //   JsonUtilsProvider.cleanNullString(risk);
            //   JsonUtilsProvider.cleanNullString(customer);

            //   // console.log(inspection);
            //   // console.log(risk);
            //   // console.log(customer);

            //   inspections.push({
            //     'inspeccion' : inspection,
            //     'riesgo' : risk,
            //     'cliente' : customer,
            //   });
            // }

            observer.next({ status: true, data: data.data });
            observer.complete();
          } else {
            observer.next({ status: data.status, data: data.error });
            observer.complete();
          }

          // let result = this.storageService.loadInspection(document, plate, this, this.loadCallback);
        });
    });
  }

  public loadInspectionDetails(quoteNumber: string) {
    let body = {
      numeroCotiacion: quoteNumber,
      pais: ContextService.location.country,
    };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    // console.log('loadInspectionDetails body', body);

    return Observable.create((observer) => {
      this.httpClient
        .post(prefix + "/informacionCotizacion", body, false)
        .subscribe((data) => {
          // TODO: search locally
          const inspections = [];

          console.log("loadInspectionDetails data", data);

          if (data.status && data.data !== null) {
            observer.next({ status: true, data: data.data });
            observer.complete();
          } else {
            observer.next({ status: data.status, data: data.error });
            observer.complete();
          }

          // let result = this.storageService.loadInspection(document, plate, this, this.loadCallback);
        });
    });
  }

  public uploadInspection(body: any) {
    // const body = {
    //   "usuario": "JPEREZ",
    //   "numeroCotizacion":"123466",
    //   "resultado":"APROBADO",
    //   "comentarios":"Todo Bien",
    //   "controlesTecnicos": [{"control":"Control 1"},{"control":"Control 2"}],
    //   "pais": this.strings.countryName
    // };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    return Observable.create((observer) => {
      this.httpClient
        .post(prefix + "/envioRespuesta", body, false)
        .subscribe((data) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  public updateInspection(body: any) {
    // const body = {
    //   "usuario": "JPEREZ",
    //   "numeroCotizacion":"123466",
    //   "resultado":"APROBADO",
    //   "comentarios":"Todo Bien",
    //   "controlesTecnicos": [{"control":"Control 1"},{"control":"Control 2"}],
    //   "pais": this.strings.countryName
    // };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    return Observable.create((observer) => {
      this.httpClient
        .post(prefix + "/actualizarDatos", body, false)
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
      this.httpClient.post("leeCexperV3", body, false).subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
    });
  }
}
