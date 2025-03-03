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
    var body = null;

    return Observable.create((observer) => {
      this.httpClient
        .post("/Info/Marcas", body, true)
        .subscribe((data) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  public getCarBrandLines(brandCode: string, countryCode: string) {
    var body = {
      codMarca: brandCode
    };

    return Observable.create((observer) => {
      this.httpClient.post("/Info/Modelos", body, true).subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
    });
  }
}
