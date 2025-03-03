import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextService } from '../../infrastructure/context/context.service';
import { ImagesService as ImagesServiceCa } from 'src/app/services/remote_ca/images/images.service';
import { ImagesService as ImagesServiceHn } from 'src/app/services/remote_hn/images/images.service';
import { ConstantsService } from '../../infrastructure/constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(
    private imagesServiceCa: ImagesServiceCa,
    private imagesServiceHn: ImagesServiceHn
  ) {}

  private getServiceByCountry() {
    const countryCode = ContextService.location.country;
    return countryCode === ConstantsService.HONDURAS_CODE ? this.imagesServiceHn : this.imagesServiceCa;
  }

  public sendCarImages(images: any): Observable<any> {
    return this.getServiceByCountry().sendCarImages(images);
  }

  public sendCarDamages(image: any): Observable<any> {
    return this.getServiceByCountry().sendCarDamages(image);
  }

  public sendCarDocuments(image: any): Observable<any> {
    return this.getServiceByCountry().sendCarDocuments(image);
  }

  public sendCarAccessories(image: any): Observable<any> {
    return this.getServiceByCountry().sendCarAccessories(image);
  }

  public uploadImage(image: any): Observable<any> {
    return this.getServiceByCountry().uploadImage(image);
  }

  public uploadImages(images: any): Observable<any> {
    return this.getServiceByCountry().uploadImages(images);
  }

  public getImages(inspection: any, type: string): Observable<any> {
    return this.getServiceByCountry().getImages(inspection, type);
  }
}