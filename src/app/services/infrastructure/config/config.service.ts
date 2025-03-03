import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public static apiUrl = '';
  // public static geonamesUser = '';
  public static staticApiUrl = 'https://sgo.mapfre.com.co/servicios/rest/trnAutoInspecciones/ws/';
  public static EMarketApiUrl = "https://sgo.mapfre.com.co/servicios/restv2/autoInspecion/";
  public static strings = null;
  
}
