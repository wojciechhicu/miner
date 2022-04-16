


import { Injectable } from '@angular/core';
import { BlockService as Block} from './block.service';
import { TransactionService as Transaction} from './transaction.service'

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const MINT_PRIVATE_ADDRESS = "0700a1ad28a20e5b2a517c00242d3e25a88d84bf54dce9e1733e6096e6d6495e";
const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_ADDRESS, "hex");
const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic("hex");

@Injectable({
  providedIn: 'root',
})
export class BlockChainService {
  public chain;
  public difficulty:number
  public blockTime:number;
  public transactions: Transaction[];
  public miningReward: string;

  constructor() {
    const maximumCoinsInMarket = new Transaction(MINT_PUBLIC_ADDRESS,'04f91a1954d96068c26c860e5935c568c1a4ca757804e26716b27c95d152722c054e7a459bfd0b3ab22ef65a820cc93a9f316a9dd213d31fdf7a28621b43119b73','138000000')
    this.chain = [new Block(Date.now().toString(),[maximumCoinsInMarket])];
    this.difficulty = 1;
    this.blockTime = 3000;
    this.transactions = []
    this.miningReward = '1';
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

  newTransaction(transaction:Transaction){
    this.transactions.push(transaction)
  }

  mineTransaction(rewardAddress){
    this.addBlock(new Block(Date.now().toString(), [new Transaction(MINT_PUBLIC_ADDRESS,rewardAddress,this.miningReward),...this.transactions]))
    this.transactions = [];
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
