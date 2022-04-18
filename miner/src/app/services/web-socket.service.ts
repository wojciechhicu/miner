import { Injectable } from '@angular/core';

//importing modules for server
//import {WebSocketServer} from 'ws';
import { WebSocket, WebSocketServer} from 'ws'
//import * as fs from 'fs';
import { fork } from 'child_process';

//importing crypto related modules
import * as CRYPTO from 'crypto-js';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//importing blockchain related services
import { BlockService as Block } from './blockCHain/block.service';
import { TransactionService as Transaction } from './blockCHain/transaction.service';
import { BlockChainService as BlockChain } from './blockCHain/block-chain.service';
import { UtilsService as Log } from './utils.service';

// chain in json file
//import data from './blockCHain/log.json'
//const loadChainJSON = require('./blockCHain/log.json')


//const server = new WS.Server({ port: PORT });
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  //node variables
  // PORT = parseInt(process.env.PORT) || 6969;
  // PEERS = process.env.PEERS ? process.env.PEERS.split(',') : [];
  // MY_ADDRESS = process.env.MY_ADDRESS || 'ws://localhost:4201';
  // ENABLE_MINING = process.env.ENABLE_MINING === 'true' ? true : false;
  // ENABLE_LOGGING = process.env.ENABLE_LOGGING === 'true' ? true : false;
  // // Addresses and sockets from connected nodes.
  // opened = [];
  //server = new WebSocketServer({ port: 2000 });
  connected = [];

  constructor() {}

  test(){
    
  }
}
