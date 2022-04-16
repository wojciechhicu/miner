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
  public hash: string
  public nonce: number;
  public difficulty:number;

  constructor(timestamp:string,transaction:TransactionService[], difficulty:number=1) {
    //this.index = index
    this.timestamp = timestamp;
    this.transaction = transaction;
    this.hash = this.getHash(this);
    this.prevHash = '';
    this.difficulty = difficulty;
    this.nonce = 0;
  }

  public getHash(block:this){
    return CRYPTO.SHA256(JSON.stringify(block.transaction) + block.timestamp + block.prevHash + block.difficulty + block.nonce).toString();
  }

  public mineBlock(difficulty:number){
    while(!this.hash.startsWith(Array(difficulty + 1).join('0'))){
      this.nonce++;
      this.hash = this.getHash(this);
    }
    this.index + 1
  }
}
