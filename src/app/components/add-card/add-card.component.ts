import { Component } from '@angular/core';
import { CardService } from '../../services/card.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Card } from '../../models/card.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.sass']
})
export class AddCardComponent {
  card: Card;

  constructor(public cardsService: CardService, private fb: FormBuilder, public snackBar: MatSnackBar) { }

  createCardForm = this.fb.group({
    name: ['', Validators.required],
    path: ['', Validators.required],
    value: ['', Validators.required],
    unitSymbol: ['', Validators.required],
    type: ['', Validators.required]
  });

  onSubmit() {
    this.cardsService.addCard(this.createCardForm.value)
      .subscribe(() => {
        this.snackBar.open('Card is created!', '', {
          duration: 2000,
        });
      },
        error => this.snackBar.open('Error: ' + error, '', {
          duration: 2000,
        })
      );
  }
}
