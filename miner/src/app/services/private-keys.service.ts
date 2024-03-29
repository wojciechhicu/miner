import { Injectable } from '@angular/core';
import { Bip39 } from '../bip39/bip39'
import * as CryptoJS from 'crypto-js';
import { walletList } from '../interfaces/walletList.interface';

const EC = require('elliptic').ec;


@Injectable({
  providedIn: 'root'
})
export class PrivateKeysService {

  constructor() { }

  //step 1 to create private key : pick one random number
  private getRandomDigit(): number {
    return Math.floor(Math.random() * Math.floor(2));
  }
  //step 2 to create private key : create 132 digit binary number
  public generateBigNumberKey(): string {
    let string: string = "";
    for (var r = 0; r < 132; r++) {
      string += this.getRandomDigit();
    }
    return string;
  }

  //step 3 to create private key : create array which contain 12 indexes with 11 digit numbers
  private getBipArrayWords() {
    let bigNumber: string = this.generateBigNumberKey();
    console.log(bigNumber);
    var numbersArray = new Array();
    var tempArray = new Array();
    var tempData;
    for (var e = 1; e <= 132; e++) {

      if (e % 11 == 0) {
        for (var i = e - 11; i < e; i++) {
          tempArray.push(bigNumber[i])
        }
        tempData = tempArray.join("");
        tempArray = [];
        numbersArray.push(tempData);
      }
    }
    numbersArray = numbersArray.map((x) => +x);
    let finalArray = new Array();
    for (var i = 0; i < 12; i++) {
      finalArray[i] = parseInt(numbersArray[i], 2)
    }
    return finalArray;
  }

  //step 4 to create private key : create table with words; return final 12 words as private key
  private getWordsFromNumbers(): any {
    let array: any[] = this.getBipArrayWords();
    let arrayOfWords = new Array();
    for (var t = 0; t < 12; t++) {
      arrayOfWords[t] = Bip39[array[t]]
    }
    return arrayOfWords;
  }

  //create public key from private key
  public createWallet() {
    let privateKey = this.generateBigNumberKey();
    let publicKey = CryptoJS.SHA256(privateKey).toString();
    const data:walletList = {
      privateKey: privateKey,
      publicKey: publicKey
    };
    return data;
  }

public createWalletKeysPair(){
  const ec = new EC('secp256k1');
  const keys = ec.genKeyPair()
  const publicKey = keys.getPublic('hex');
  const privateKey = keys.getPrivate('hex');
  const msg = "dassdfsdf"
  const siganture = keys.sign(msg)
  const keysData: walletList = {
    privateKey: privateKey,
    publicKey: publicKey
  }
  return keysData;
}

}
