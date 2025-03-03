import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import dateFormat from 'dateformat';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tranKey: string;
  private nonce: string;
  private seed: string;

  constructor() {
    this.tranKey = '20leH074822qP426';
  }

  public create() {

    var now = new Date();
    
    this.nonce = Math.round((Math.random() * 10000000000000)).toString();
    this.seed = dateFormat(now, "yyyy-mm-dd'T'HH:MMZ").replace("GMT", ""); 

  }

  public getKey() {
    return "getKey";
  }

  public getNonce() {
    return this.nonce;
  }

  public getSeed() {
    return this.seed;
  }

  public getDigestTrankey() {
    try {
      var data = this.nonce + this.seed + this.tranKey;
      var hashedKey = CryptoJS.SHA1(data).toString(CryptoJS.enc.Base64);
 
      return hashedKey;
    }
    catch (err) {
      return null
    }
  }

  public getEncodedNonce() {
    return btoa(this.nonce);
  }

  public getAuthentication() {

    this.create();

    return {
      "key": this.getDigestTrankey(),
      "nonce": this.getEncodedNonce(),
      "seed": this.getSeed()
    };
  }

  public stringToByteArray(input) {
    
    var data = [];
    for (var i = 0; i < input.length; i++) {
      data.push(input.charCodeAt(i));
    }

    return data;
  }
}
