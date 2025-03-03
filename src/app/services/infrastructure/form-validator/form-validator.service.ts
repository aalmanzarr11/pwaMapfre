import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor(public http: HttpClient) {
  }

  public static emailCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let input = control.value;
      let isValid = re.test(input);
      if (!isValid)
        return { 'emailCheck': { isValid } }
      else
        return null;
    };
  }

  public static numberCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      var re = new RegExp("^(\\d+)$");
      let input = control.value;
      let isValid = re.test(input);
      if (!isValid)
        return { 'number_check': { isValid } }
      else
        return null;
    };
  }

  public static URLCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      var re = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
      let input = control.value;
      let isValid = re.test(input);
      if (!isValid)
        return { 'url_check': { isValid } }
      else
        return null;
    };
  }

}
