import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../interfaces/eLogInHandler.interface';

@Component({
  selector: 'app-e-login-comp-hander',
  templateUrl: './e-login-comp-hander.component.html',
  styleUrls: ['./e-login-comp-hander.component.scss']
})
export class ELoginCompHanderComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
