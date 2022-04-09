import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { walletList } from '../../../interfaces/walletList.interface';
import { DatabaseService } from '../../../services/database.service';
import { map } from 'rxjs/operators';
import { Country } from '../../../interfaces/countrySelectFlags.interface';



interface Pools {
  value: string;
  viewValue: string;
}
interface Pools2 {
  numericCode: string;
  serverIPAdress: string;
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
  serverIP: Pools2[] = [
    {
      numericCode: '276',
      serverIPAdress: 'localhost:1001'
    },
    {
      numericCode: '840',
      serverIPAdress: 'localhost:1002'
    },
    {
      numericCode: '156',
      serverIPAdress: 'localhost:1003'
    },
    {
      numericCode: '643',
      serverIPAdress: 'localhost:1004'
    },
    {
      numericCode: '036',
      serverIPAdress: 'localhost:1005'
    },
    {
      numericCode: '076',
      serverIPAdress: 'localhost:1006'
    },
    {
      numericCode: '818',
      serverIPAdress: 'localhost:1007'
    },
    {
      numericCode: '484',
      serverIPAdress: 'localhost:1008'
    },
  ]

  predefinedCountries: Country[] = [
    {
      name: 'Germany',
      alpha2Code: 'DE',
      alpha3Code: 'DEU',
      numericCode: '276',
      callingCode: '+49'
    },
    {
      name: 'USA',
      alpha2Code: 'US',
      alpha3Code: 'USA',
      numericCode: '840',
      callingCode: '+1'
    },
    {
      name: 'China',
      alpha2Code: 'CN',
      alpha3Code: 'CHN',
      numericCode: '156',
      callingCode: '+86'
    },
    {
      name: 'Russian Federation',
      alpha2Code: 'RU',
      alpha3Code: 'RUS',
      numericCode: '643',
      callingCode: '+7'
    },
    {
      name: 'Australia',
      alpha2Code: 'AU',
      alpha3Code: 'AUS',
      numericCode: '036',
      callingCode: '+61'
    },
    {
      name: 'Brazil',
      alpha2Code: 'BR',
      alpha3Code: 'BRA',
      numericCode: '076',
      callingCode: '+55'
    },
    {
      name: 'Egypt',
      alpha2Code: 'EG',
      alpha3Code: 'EGY',
      numericCode: '818',
      callingCode: '+20'
    },
    {
      name: 'Mexico',
      alpha2Code: 'MX',
      alpha3Code: 'MEX',
      numericCode: '484',
      callingCode: '+52'
    },
  ];
  constructor(fb: FormBuilder, private db: DatabaseService) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
    this.getWallets()
    //this.gpuMultiplyMatrix();
  }

  onCountrySelected($event: Country) {
    for (var i = 0; i < this.serverIP.length; i++) {
      if ($event.numericCode == this.serverIP[i].numericCode) {
        this.selectedPool = this.serverIP[i].serverIPAdress
      }
    }
  }
  workerTask() {

    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('../../../.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data.block}`);
      };
      worker.postMessage('hello');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
  getWallets(): void {
    this.db.readUserWallet().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      })
      ))
    ).subscribe(data => {
      this.walletList = data;
    })
  }



}
