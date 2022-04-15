/// <reference lib="webworker" />


import * as CryptoJS from 'crypto-js'
//import {BlockService } from './services/blockCHain/block.service'
// let index: number = 0;
// let timestamp: any = Date.now();
// let data: string = 'Here is some data';
// let previousHash: string = '9b7ecc6eeb83abf9ade10fe38865df4499be3568dcc507ae2ec3b44989cb0093';
// let hash: string = '9b7ecc6eeb83abg9ade10fe38865df4499be3568dcc507ae2ec3b44989cb0093';
// let nonce: number = 0;

// function calculateHash(){
//   return CryptoJS.SHA256(index + previousHash + timestamp + JSON.stringify(data) + nonce).toString();
// }

// function mineBlock(difficulty:number):string{
//   while(hash.substring(0, difficulty) !== Array(difficulty +1 ).join("0")){
//     nonce ++;
//     hash = calculateHash();
//   }
//   return `Block mined with Hash: ${hash}`
// }

function dupa(){
  return 'dupa'
}
addEventListener('message', ({ data }) => {
  const response = {block : dupa()};
  postMessage(response);
});
