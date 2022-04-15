import { Injectable } from '@angular/core';
import { Inject } from '@angular/core'
import * as CRYPTO from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class BlockService {

  // init variables
  public index: number;
  public timestamp: string
  public data:any;
  public prevHash: string;
  public hash: any

  constructor(timestamp:string,data:any) {
    //this.index = index
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.getHash();
    //this.prevHash = prevHash;
  }

  public getHash(){
    return CRYPTO.SHA256(JSON.stringify(this.data) + this.timestamp + this.prevHash);
  }
}
