import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { HashService } from '../../../services/hash.service';
import { DatabaseService } from '../../../services/database.service';

export interface PeriodicElement {
  walletID: string;
  position: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, walletID: 'Hydrogen'},
];

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'walletID'];
  dataSource = ELEMENT_DATA;


  constructor(private readonly authService: FirebaseService,private readonly hash: HashService, public db: DatabaseService) { }

  userUID: any;

  ngOnInit(): void {
    this.userUID = this.authService.getUserId();
    //this.userUID = this.hash.calulateWalletAdress(this.userUID);
    this.db.readUserWallet(this.userUID)
  }

}
