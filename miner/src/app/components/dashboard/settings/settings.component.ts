import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { walletList } from '../../../interfaces/walletList.interface';
import { DatabaseService } from '../../../services/database.service';
import { map } from 'rxjs/operators';


interface Pools {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  walletList: any;
  selectedWallet: string;
  selectedPool: string;

  pools: Pools[] = [
    {value: 'localhost:10001', viewValue: 'Tomato'},
    {value: 'localhost:10002', viewValue: 'Orange'},
    {value: 'localhost:10003', viewValue: 'DodgerBlue'},
    {value: 'localhost:10004', viewValue: 'MediumSeaGreen'},
    {value: 'localhost:10005', viewValue: 'Gray'},
    {value: 'localhost:10006', viewValue: 'SlateBlue'},
    {value: 'localhost:10007', viewValue: 'Violet'},
    {value: 'localhost:10008', viewValue: 'LightGray'},
  ];
  constructor(fb: FormBuilder, private db: DatabaseService) { 
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
    this.getWallets()
  }

  getWallets():void{
    this.db.readUserWallet().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      })
      ))
    ).subscribe(data => {
      this.walletList = data ;
    })
}
  }
