import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonUtilsService {
  public static cleanNullString(object: any) {

    if(object != null){
      Object.keys(object).forEach(function (key) {
        if (object[key] === "null") {
          object[key] = "";
        }
      });
    }
    
  }
}
