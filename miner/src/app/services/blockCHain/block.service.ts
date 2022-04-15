import { Injectable } from '@angular/core';
import { Inject } from '@angular/core'
import * as CRYPTO from 'crypto-js';
import { TransactionService } from './transaction.service'

@Injectable({
  providedIn: 'root'
})

export class BlockService {

  // init variables
  public index: number;
  public timestamp: string
  public transaction:TransactionService[];
  public prevHash: string;
  public hash: any

  constructor(timestamp:string,transaction:TransactionService[]) {
    //this.index = index
    this.timestamp = timestamp;
    this.transaction = transaction;
    this.hash = this.getHash();
    //this.prevHash = prevHash;
  }

  public getHash(){
    return CRYPTO.SHA256(JSON.stringify(this.transaction) + this.timestamp + this.prevHash).toString();
  }
}
