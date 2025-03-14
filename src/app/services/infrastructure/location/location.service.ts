import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../http-client/http-client.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public httpClient: HttpClientService) {
    // //console.log('Hello LocationServiceProvider Provider');
  }

  public reverseGeocode(lat, long) {

    return Observable.create(observer => {
      
      // const username = ConfigServiceProvider.geonamesUser; 
      //console.log("cloudflare serviceURL: ", environment.cloudflare);

      this.httpClient.get(environment.cloudflare, false, false, {responseType: 'text' as 'json'}).subscribe(
        data => {
          // alert('cloudflare result: ' + JSON.stringify(data));

          observer.next({status: true, data: data.data});
          observer.complete();
        }
      );
    });
  }
}
