import { Injectable } from '@angular/core';
import { BlockService } from './block.service';

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

@Injectable({
  providedIn: 'root',
})
export class BlockChainService {
  public chain;
  private Data = new Array('12');
  constructor() {
    this.chain = [new BlockService(Date.now().toString(), this.Data)];
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block: BlockService) {
    block.prevHash = this.getLastBlock().hash;
    block.hash = block.getHash();
    this.chain.push(block);
  }
}
