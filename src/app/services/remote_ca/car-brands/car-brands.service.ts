import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContextService } from "../../infrastructure/context/context.service";
import { HttpClientService } from "../../infrastructure/http-client/http-client.service";
import { TokenService } from "../../infrastructure/token/token.service";

@Injectable({
  providedIn: "root",
})
export class CarBrandsService {
  constructor(
    public httpClient: HttpClientService,
    private tokenService: TokenService
  ) {}

  public getCarBrands(countryCode: string) {
    var body = {
      pais: countryCode,
    };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    return Observable.create((observer) => {
      this.httpClient
        .post(prefix + "/listaMarcas", body, true)
        .subscribe((data) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  public getCarBrandLines(brandCode: string, countryCode: string) {
    var body = {
      codigo: brandCode,
      pais: countryCode,
    };

    let prefix = ContextService.getPrefixAPI();
    body = ContextService.getBodyAPI(body);

    // var endPoint = ContextService.location.country === ConstantsProvider.GUATEMALA_CODE ? '/listaLineas' : '/listaLineas';
    var endPoint = "/listaLineas";

    return Observable.create((observer) => {
      this.httpClient.post(prefix + endPoint, body, true).subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
    });
  }
}
