import { Component, OnInit } from '@angular/core';
//import { FirebaseService } from '../../../services/firebase.service';
import { HashService } from '../../../services/hash.service';
import { DatabaseService } from '../../../services/database.service';
import { PrivateKeysService } from '../../../services/private-keys.service'
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

  constructor(private readonly hash: HashService, public db: DatabaseService, private keys: PrivateKeysService,public dialog: MatDialog) { }
  walletArray = new Array();

  ngOnInit(): void {
    this.getWallets();
    this.keys.keys();
  }

  createWallet(){
    let wallet = this.keys.createWallet();
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










  createWallet2(){
    
  }
}
