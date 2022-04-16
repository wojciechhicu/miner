import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateLabel } from '../../../interfaces/walletUpdateLabel.interface';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-edit-label-handler',
  templateUrl: './edit-label-handler.component.html',
  styleUrls: ['./edit-label-handler.component.scss']
})
export class EditLabelHandlerComponent implements OnInit {
  addLabelForm: FormGroup
  constructor( @Inject(MAT_DIALOG_DATA) public data: UpdateLabel,private fb: FormBuilder, private db: DatabaseService) { }

  ngOnInit(): void {
    this.addLabelForm = this.fb.group({
      label: ['', [Validators.required]],
    });
  }
  get label() {
    return this.addLabelForm.get('label');
  }
  public addLabel(){
    this.db.updateWalletLabel( this.data.key, this.addLabelForm.value.label);
  }
}
