import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectionService, ConnectionStatus } from '../connection/connection.service';
// import { CacheService } from 'ionic-cache';
import { ConfigService } from '../config/config.service';
import { ContextService } from '../context/context.service';
import { timeout } from 'rxjs/operators';
import { ConstantsService } from '../constants/constants.service';
import { BaseUrl } from 'src/app/shared/baseUrl';
import { RequestResponse } from 'src/app/shared/Dtos/requestResponse.dto'; 

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  groupKey = 'mapfre';
  ttl: number = 60 * 60;
  delayType = 'all'; // send new request to server everytime, if it's set to none it will send new request only when entry is expired

  static TIME_OUT = 60000;

  constructor(
    private httpClient: HttpClient,
    // private cache: CacheService,
    private connectionService: ConnectionService
  ) { }

  public get(url: string, cached: boolean = false, useBase: boolean = true, responseType = null) {
    return Observable.create(observer => {


      const cacheKey = url;
      // const request = this.httpClient.get(url, {responseType: 'text'}).timeout(HttpClientProvider.TIME_OUT);
      // const request = this.httpClient.get(url, {responseType: 'arraybuffer'}).timeout(HttpClientProvider.TIME_OUT);
      const request = responseType == null ?
        this.httpClient.get(url).pipe(timeout(HttpClientService.TIME_OUT)) :
        this.httpClient.get(url, responseType).pipe(timeout(HttpClientService.TIME_OUT));

      // if(cached){
      //   request = this.cache.loadFromDelayedObservable(cacheKey, request, this.groupKey, this.ttl, this.delayType);
      // }


      this.connectionService.getNetworkStatus().subscribe(status => {
 

        if (status === ConnectionStatus.Offline) {
          observer.next({ status: false, data: 'No hay conexión a internet' });
          observer.complete();
        } else {
          request.subscribe(
            data => {
              observer.next({ status: true, data: data });
              observer.complete();
            },
            err => {
              observer.next({
                status: false,
                data: 'En este momento hay problemas con su conexión a internet, por favor revise la conexión y vuelva a intentar'
              });
              // observer.next({ status: false, data: err });
              observer.complete();
            },
            () => { }
          );
        }

      });

    });
  }

  public getTests(endPoint: string, cached: boolean) {
    return Observable.create(observer => {
      const url = endPoint;
      const cacheKey = url;
      const request = this.httpClient.get(url);

      // if(cached){
      //   request = this.cache.loadFromDelayedObservable(cacheKey, request, this.groupKey, this.ttl, this.delayType);
      // }

      request.subscribe(
        data => {
          observer.next({ status: true, data: data });
          observer.complete();
        },
        err => {
          observer.next({ status: false, data: err });
          // observer.next({ status: false, data: err });
          observer.complete();
        },
        () => { }
      );
    });
  }

  public post(url: string, body: any, cached: boolean = false): Observable<any> {
    console.log(url)
    console.log(body)
    return Observable.create(observer => {


      const cacheKey = url;

      let httpOptions = {};

      if ( url != BaseUrl.token) {
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + ContextService.apiToken 
          })
        };
      }
      else {
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json' 
          })
        };
      }
 
      const request = this.httpClient.post(url, body, httpOptions).pipe(timeout(HttpClientService.TIME_OUT)); 
      
      this.connectionService.getNetworkStatus().subscribe(status => { 

        if (status == ConnectionStatus.Offline) {
          observer.next({ status: false, data: 'No hay conexión a internet' });
          observer.complete();
        } else {
          request.subscribe(
            data => { 
              console.log(data)
              observer.next({ status: true, data: data, responseData: data });
              observer.complete();
            },
            err => { 
              console.log(err)
              observer.next({
                status: false,
                data: 'En este momento hay problemas con su conexión a internet, por favor revise la conexión y vuelva a intentar '+url,
                responseData: err,
                error: err.message
              }); 
              observer.complete();
            },
            () => { }
          );
        }
      });

    });
  }
 
}
