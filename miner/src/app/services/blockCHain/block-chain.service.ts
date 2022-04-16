import { Injectable } from '@angular/core';
import { BlockService as Block} from './block.service';
import { TransactionService } from './transaction.service'

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

@Injectable({
  providedIn: 'root',
})
export class BlockChainService {
  public chain;
  public difficulty:number
  public blockTime:number;
  //private transaction: TransactionService[];
  constructor() {
    this.chain = [new Block(Date.now().toString(),[new TransactionService('1','2','12.2')])];
    this.difficulty = 1;
    this.blockTime = 3000;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block: Block) {
    block.prevHash = this.getLastBlock().hash;
    block.hash = block.getHash(block);
    block.mineBlock(this.difficulty);
    this.chain.push(block);
    this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
  }

  isBlockChainValid(blockchain = this){
    for(let i = 1; i < blockchain.chain.length; i++){
      const currentBlock = blockchain.chain[i];
      const prevBlock = blockchain.chain[i-1]

      if(currentBlock.hash !== currentBlock.getHash() || currentBlock.prevHash !== prevBlock.hash){
        return false
      }
    }
    return true
  }

}
