import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../http-client/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public httpClient: HttpClientService) {
    // console.log('Hello LocationServiceProvider Provider');
  }

  public reverseGeocode(lat, long) {

    return Observable.create(observer => {
      
      // const username = ConfigServiceProvider.geonamesUser;
      const serviceURL = `https://www.cloudflare.com/cdn-cgi/trace`;
      console.log("cloudflare serviceURL: ", serviceURL);

      this.httpClient.get(serviceURL, false, false, {responseType: 'text' as 'json'}).subscribe(
        data => {
          // alert('cloudflare result: ' + JSON.stringify(data));

          observer.next({status: true, data: data.data});
          observer.complete();
        }
      );
    });
  }

  // public reverseGeocode_old(lat, long) {

  //   return Observable.create(observer => {
      
  //     const username = ConfigServiceProvider.geonamesUser;
  //     const serviceURL = `http://api.geonames.org/findNearbyJSON?lat=${lat}&lng=${long}&username=${username}`;
  //     console.log("geonames serviceURL: ", serviceURL);

  //     // const serviceURL = 'http://api.geonames.org/findNearbyJSON?lat=15.141610&lng=-90.641946&username=gtrujillos';

  //     this.httpClient.get(serviceURL, false, false).subscribe(
  //       data => {
  //         // console.log(data);

  //         observer.next({status: true, data: data.data});
  //         observer.complete();
  //       }
  //     );
      
  //   });

  // }
}
