import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.sass']
})
export class EditCardComponent  {

  constructor(public cardService: CardService, private fb: FormBuilder, public snackBar: MatSnackBar) { }

  editCardForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    path: ['', Validators.required],
    value: ['', Validators.required],
    unitSymbol: ['', Validators.required],
    type: ['', Validators.required]
  });

  onSubmit() {
    this.cardService.editCard(this.editCardForm.value)
      .subscribe(() => {
        this.snackBar.open('Card is updated!', '', {
          duration: 2000,
        });
      },
        error => this.snackBar.open('Error: ' + error, '', {
          duration: 2000,
        })
      );
  }
}
