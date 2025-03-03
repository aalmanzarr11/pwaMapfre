import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  static PANAMA_CODE = '507';
  static PANAMA_CODE_ISO = 'PA';

  static GUATEMALA_CODE = '502';
  static GUATEMALA_CODE_ISO = 'GT';

  static COSTARICA_CODE = '506';
  static COSTARICA_CODE_ISO = 'CR';

  static NICARAGUA_CODE = '505';
  static NICARAGUA_CODE_ISO = 'NI';

  static HONDURAS_CODE = '504';
  static HONDURAS_CODE_ISO = 'HN';

  static ELSALVADOR_CODE = '503';
  static ELSALVADOR_CODE_ISO = 'SV';
}
