import { Injectable } from '@angular/core';
//hashing functions
import { Buffer } from 'buffer';
import { SHA256 } from 'crypto-js';

  //elliptic hashing
  import { ec } from 'elliptic';
  const EC = require('elliptic').ec;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  //init values
  signature: any;
  amount: number;
  toAddress: string;
  fromAddress: string;
  timestamp: number;
  ec = new EC('secp256k1');

  constructor(fromAddress: string, toAddress: string, amount: string) { 
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = parseFloat(amount);
    this.timestamp = Date.now();
  }

  private calculateHash(): string {
    return SHA256(
      this.fromAddress + this.toAddress + this.amount + this.timestamp
    ).toString();
  }

  signTransaction(signingKey: ec.KeyPair) {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('There is a problem with key pairing');
    }
    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, 'base64');

    this.signature = sig.toDER('hex');
  }

  isValid(): boolean {
    if (!this.signature || this.signature.length === 0) {
      return false;
    }

    try {
      let buffer = Buffer.from(this.fromAddress, 'hex');
      const publicKey = EC.keyFromPublic(buffer, 'hex');
      return publicKey.verify(this.calculateHash(), this.signature);
    } catch (error) {
      return false;
    }
  }
}
