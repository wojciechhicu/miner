import { Injectable } from '@angular/core';
import { onValue, ref, set, } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database/';
import { walletList } from '../interfaces/walletList.interface';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  userUID = this.authService.getUserId();
  private dbPath = '/wallets/' + this.userUID;
  walletRef: AngularFireList<walletList>;

  constructor(private readonly authService: FirebaseService, private database: AngularFireDatabase) {
    this.walletRef = database.list(this.dbPath);
  }
  readUserWallet(): AngularFireList<walletList> {
    return this.walletRef;
  }

  crateUserWallet(wallet: walletList){
    return this.walletRef.push(wallet);
  }

  updateWalletLabel(key: string, value:string){
    return this.walletRef.update(key,{label: value})
  }
}
