import { Injectable } from '@angular/core';
import { Database, onValue, ref, set } from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public database: Database ) { }

  readUserWallet(UID: string){
    const databaseRef = ref(this.database, 'wallets/' + UID);
    onValue(databaseRef,(snapshot)=>{
      const data = snapshot.val();
      console.log(data)
    })
  }
}
