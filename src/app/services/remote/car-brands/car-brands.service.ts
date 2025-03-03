import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContextService } from "../../infrastructure/context/context.service";
import { HttpClientService } from "../../infrastructure/http-client/http-client.service";
import { TokenService } from "../../infrastructure/token/token.service";
import { BaseUrl } from "src/app/shared/baseUrl";

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
        .post(BaseUrl.getCarBrands, body, true)
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
      this.httpClient.post(BaseUrl.getCarBrandLines, body, true).subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
    });
  }
}
