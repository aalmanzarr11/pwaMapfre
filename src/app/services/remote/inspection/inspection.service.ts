import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContextService } from "../../infrastructure/context/context.service";
import { InspectionService as InspectionServiceCa } from "src/app/services/remote_ca/inspection/inspection.service";
import { InspectionService as InspectionServiceHn } from "src/app/services/remote_hn/inspection/inspection.service";
import { ConstantsService } from "../../infrastructure/constants/constants.service";

@Injectable({
  providedIn: "root",
})
export class InspectionService {
  constructor(
    private inspectionServiceCa: InspectionServiceCa,
    private inspectionServiceHn: InspectionServiceHn
  ) {}

  private getServiceByCountry() {
    const countryCode = ContextService.location.country;
    return countryCode === ConstantsService.HONDURAS_CODE ? this.inspectionServiceHn : this.inspectionServiceCa;
  }

  public getInspectionNumber(): Observable<any> {
    return this.getServiceByCountry().getInspectionNumber();
  }

  public loadInspections(document: string, plate: string, policy: string): Observable<any> {
    return this.getServiceByCountry().loadInspections(document, plate, policy);
  }

  public loadInspectionDetails(quoteNumber: string): Observable<any> {
    return this.getServiceByCountry().loadInspectionDetails(quoteNumber);
  }

  public uploadInspection(body: any): Observable<any> {
    return this.getServiceByCountry().uploadInspection(body);
  }

  public updateInspection(body: any): Observable<any> {
    return this.getServiceByCountry().updateInspection(body);
  }

  public getCexper(plate: string, TipUsusario: string): Observable<any> {
    return this.getServiceByCountry().getCexper(plate, TipUsusario);
  }
}