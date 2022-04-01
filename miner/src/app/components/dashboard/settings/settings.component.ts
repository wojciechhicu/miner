import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

interface Pools {
  value: string;
  viewValue: string;
}
interface Wallets {
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

  wallets: Wallets[] = [
    {value: 'Tomato', viewValue: 'Tomato'},
    {value: 'Orange', viewValue: 'Orange'},
    {value: 'DodgerBlue', viewValue: 'DodgerBlue'},
    {value: 'MediumSeaGreen', viewValue: 'MediumSeaGreen'},
    {value: 'Gray', viewValue: 'Gray'},
    {value: 'SlateBlue', viewValue: 'SlateBlue'},
    {value: 'Violet', viewValue: 'Violet'},
    {value: 'LightGray', viewValue: 'LightGray'},
  ];

  pools: Pools[] = [
    {value: 'Tomato', viewValue: 'Tomato'},
    {value: 'Orange', viewValue: 'Orange'},
    {value: 'DodgerBlue', viewValue: 'DodgerBlue'},
    {value: 'MediumSeaGreen', viewValue: 'MediumSeaGreen'},
    {value: 'Gray', viewValue: 'Gray'},
    {value: 'SlateBlue', viewValue: 'SlateBlue'},
    {value: 'Violet', viewValue: 'Violet'},
    {value: 'LightGray', viewValue: 'LightGray'},
  ];


  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  constructor(fb: FormBuilder) { 
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
  }

}
