import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public log16(x) {
    return Math.log(x) / Math.log(16);
}

}
