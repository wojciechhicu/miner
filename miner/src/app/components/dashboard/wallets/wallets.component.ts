import { Component, OnInit } from '@angular/core';
//import { FirebaseService } from '../../../services/firebase.service';
import { HashService } from '../../../services/hash.service';
import { DatabaseService } from '../../../services/database.service';
import { PrivateKeysService } from '../../../services/private-keys.service'
import { BlockChainService as BlockChain} from '../../../services/blockCHain/block-chain.service'
import { BlockService as Block} from '../../../services/blockCHain//block.service';
import { TransactionService as Transaction} from '../../../services/blockCHain//transaction.service';
import { map } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { EditLabelHandlerComponent } from '../../../handlers/editWallet/edit-label-handler/edit-label-handler.component';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit {
  displayedColumns: string[] = ['position','privateKey', 'publicKey', 'key','edit' ];
  dataSource: any;
  wallets: any;
  //tranzakcja: TransactionService

  constructor(private readonly hash: HashService,
     public db: DatabaseService, 
     private keys: PrivateKeysService,
     public dialog: MatDialog,
    // public testBlockChain: BlockChainService,
    // public transaction: TransactionService
    // public testBlock: BlockService
     ) { }
  walletArray = new Array();

  ngOnInit(): void {
    this.getWallets();
    this.testF()
  }

  createWallet(){
    let wallet = this.keys.createWalletKeysPair();
    this.db.crateUserWallet(wallet);
  }

  getWallets(): void {
      this.db.readUserWallet().snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        })
        ))
      ).subscribe(data => {
        this.wallets = data;
        this.dataSource = this.wallets;
      })
  }
  editLabel(key: string){
    this.dialog.open(EditLabelHandlerComponent,{
      data: {
        key: key
      }
    })
  }



  testF(){
    
    //const tranzakcja = new TransactionService('9f20a7bc21662cd641d82cb5819944dc35aee7be9d8ffb8fa682902728b07d15','04befe358811009b4d75123465d7de2727e8b31396039295dfd2e65f77a4e3b38c5695280bc6688f70064fb814a3d67f434bc18aa185666ecadd1a621036b21eba', '10.00022222')
    //const blok = new BlockService(Date.now().toString(), tranzakcja[])
    // const testChain = new this.testBlockChain.chain()
    // testChain.addBlock(new BlockService(Date.now().toString(),['hello']))
    const chain = new BlockChain()
    chain.addBlock(new Block(Date.now().toString(),[new Transaction('1','2','12.2')]))
    chain.addBlock(new Block(Date.now().toString(),[new Transaction('1','2','12.2')]))
    chain.addBlock(new Block(Date.now().toString(),[new Transaction('1','2','12.2')]))
    //const testBlock = new Block(Date.now().toString(),[new Transaction('12','13','22')])
     console.log(chain)
  }
}
