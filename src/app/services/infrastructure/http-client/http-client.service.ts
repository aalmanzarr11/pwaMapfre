import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectionService, ConnectionStatus } from '../connection/connection.service';
// import { CacheService } from 'ionic-cache';
import { ConfigService } from '../config/config.service';
import { ContextService } from '../context/context.service';
import {timeout} from 'rxjs/operators';
import { ConstantsService } from '../constants/constants.service';

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
  ) {}

  public get(endPoint: string, cached: boolean = false, useBase: boolean = true, responseType = null) {
    return Observable.create(observer => {

      let url = '';

      if (useBase) {
        url = ConfigService.apiUrl + endPoint;
      } else {
        url = endPoint;
      }

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

        // console.log('get getNetworkStatus: ' + status);

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
            () => {}
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
        () => {}
      );
    });
  }

  public post(endPoint: string, body: any, cached: boolean = false) {
    return Observable.create(observer => {

      // const url =
      //   endPoint !== 'leeParametrosAPPV2'
      //     ? ConfigServiceProvider.apiUrl + endPoint
      //     : ConfigServiceProvider.staticApiUrl + endPoint;

      const url = ConfigService.apiUrl + endPoint;
      const cacheKey = url;

      // console.log('ContextServiceProvider.apiToken', url, ContextServiceProvider.apiToken);

      // this.httpClient.setSSLCertMode("nocheck").then((resp: any) => {
      //   console.log(resp);
      // }, (error) => {
      //   console.log(error);
      // });
 
      // var headersObject = new HttpHeaders();
      // // headersObject.append('Content-Type', 'application/json');
      // // headersObject.append("Authorization", "Basic " + btoa("username:password"));
      // headersObject.append(
      //   "Authorization",
      //   "Bearer " + "vu-mnCFs_kcJX3i9pTZBup67T7fAJVg0d9D5A8i99AfJOetemitnpoLxKKGxzO2kE_X0cp7DBUAsW1oj-MyK_R4LD5GgW8t53U_oodvlS1br9wfEAcbkbQ6mnOzAJxgJEWyHg2yXtPkGWXN9E6fwjZzF5_A5ZhjdvUp8E5Qs_GS1ueiDY3pLKIK1ggsRbGAje3DzlDsLGXFlaCEeGXLT7Dy19nCO7OpqltmkOF9Gyx7_Oh_uI6YbYV6KnE_eCrLTQjewvIeJp_fFikWeBL-13w");

      // const httpOptions = {
      //   headers: headersObject
      // };

      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type':  'application/json',
      //     Authorization: 'Bearer ' + 'vu-mnCFs_kcJX3i9pTZBup67T7fAJVg0d9D5A8i99AfJOetemitnpoLxKKGxzO2kE_X0cp7DBUAsW1oj-MyK_R4LD5GgW8t53U_oodvlS1br9wfEAcbkbQ6mnOzAJxgJEWyHg2yXtPkGWXN9E6fwjZzF5_A5ZhjdvUp8E5Qs_GS1ueiDY3pLKIK1ggsRbGAje3DzlDsLGXFlaCEeGXLT7Dy19nCO7OpqltmkOF9Gyx7_Oh_uI6YbYV6KnE_eCrLTQjewvIeJp_fFikWeBL-13w'
      //   })
      // };

      let httpOptions = {};

      if(ContextService.userSession.userType !== 'C') {
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Bearer ' + ContextService.apiToken
          })
        };
      } 
      else{
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };
      }

      console.log('httpOptions: ', httpOptions);


      // httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

      const request = this.httpClient.post(url, body, httpOptions).pipe(timeout(HttpClientService.TIME_OUT));

      // if(cached){
      //   request = this.cache.loadFromDelayedObservable(cacheKey, request, this.groupKey, this.ttl, this.delayType);
      // }
      this.connectionService.getNetworkStatus().subscribe(status => {

        console.log(status);

        if (status == ConnectionStatus.Offline) {
          observer.next({ status: false, data: 'No hay conexión a internet' });
          observer.complete();
        } else {
          request.subscribe(
            data => {
              console.log(data);
              observer.next({ status: true, data: data, responseData: data });
              observer.complete();
            },
            err => {
              // observer.next({ status: false, data: err.error });
              console.log(err);
              observer.next({
                status: false,
                data: 'En este momento hay problemas con su conexión a internet, por favor revise la conexión y vuelva a intentar',
                responseData: err
              });
              // observer.next({ status: false, data: JSON.stringify(err) });
              observer.complete();
            },
            () => {}
          );
        }
      });

    });
  }

  public postForm(endPoint: string, body: any, cached: boolean = false) {
    return Observable.create(observer => {
      const url = ConfigService.apiUrl + endPoint;

      console.log('url', url);

      let validationType = ContextService.location.country === ConstantsService.PANAMA_CODE ?
        'PASSWORD' : 'PWA502PASS';

      const httpOptions = {
        headers: new HttpHeaders({
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'TIPO_VALIDACION': validationType
        })
      };


      const request = this.httpClient.post(url, body, httpOptions).pipe(timeout(HttpClientService.TIME_OUT));

      // if(cached){
      //   request = this.cache.loadFromDelayedObservable(cacheKey, request, this.groupKey, this.ttl, this.delayType);
      // }
      this.connectionService.getNetworkStatus().subscribe(status => {

        console.log('getNetworkStatus' + status);

        if (status === ConnectionStatus.Offline) {
          observer.next({ status: false, data: 'No hay conexión a internet' });
          observer.complete();
        } else {
          request.subscribe(
            data => {
              console.log(data);
              observer.next({ status: true, data: data, responseData: data });
              observer.complete();
            },
            err => {
              // observer.next({ status: false, data: err.error });
              console.log(err);
              observer.next({
                status: false,
                data: 'En este momento hay problemas con su conexión a internet, por favor revise la conexión y vuelva a intentar',
                responseData: err
              });
              // observer.next({ status: false, data: JSON.stringify(err) });
              observer.complete();
            },
            () => {}
          );
        }
      });

    });
  }
}
