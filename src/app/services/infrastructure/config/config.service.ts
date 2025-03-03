import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrStringsService } from '../../local/cr-strings/cr-strings.service';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public static apiUrl = environment.urlBase
  // public static geonamesUser = '';
  public static staticApiUrl =environment.staticApiUrl
  public static EMarketApiUrl =environment.EMarketApiUrl
  public static strings = CrStringsService.data;
  
}
