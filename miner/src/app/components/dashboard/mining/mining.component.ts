import { Component, OnInit } from '@angular/core';
import { WebSocketService} from '../../../services/web-socket.service'

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.scss']
})
export class MiningComponent implements OnInit {
  ws = new WebSocketService()
  constructor() { }

  ngOnInit(): void {
    this.ws.test()
  }

}
