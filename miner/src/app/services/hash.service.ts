import { Injectable } from '@angular/core';
import * as CryptoJS  from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor() { }

  calulateWalletAdress(userUID: string){
    return CryptoJS.SHA256(userUID).toString(CryptoJS.enc.Hex);
  }
  
}
