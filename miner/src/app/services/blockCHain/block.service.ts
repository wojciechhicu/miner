import { Injectable } from '@angular/core';
import * as CRYPTO from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  // init variables
  public hash;
  public prevHash:any;

  constructor(public timestamp:string = '', public data: string[]) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.getHash();
    this.prevHash = '';
  }

  public getHash(){
    return CRYPTO.SHA256(JSON.stringify(this.data) + this.timestamp + this.prevHash);
  }
}
