import { Component, OnInit } from '@angular/core';
//import { FirebaseService } from '../../../services/firebase.service';
import { HashService } from '../../../services/hash.service';
import { DatabaseService } from '../../../services/database.service';
import { PrivateKeysService } from '../../../services/private-keys.service'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'walletID', 'publicKey', 'privateKey'];
  dataSource: any;
  wallets: any;

  constructor(private readonly hash: HashService, public db: DatabaseService, private keys: PrivateKeysService) { }
  walletArray = new Array();

  ngOnInit(): void {
    this.getWallets();
    console.log(this.keys.getWordsFromNumbers(this.keys.getBipArrayWords()));
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
}
