import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.sass']
})
export class EditCardComponent implements OnInit {

  editCardForm: FormGroup;

  constructor(public cardService: CardService, private fb: FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    const cardId = window.localStorage.getItem('cardId');
    this.editCardForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      image: ['', Validators.required],
      path: ['', Validators.required],
      unitSymbol: ['', Validators.required],
      value: ['', Validators.required],
      lastUpdate: ['', Validators.required],
      type: ['', Validators.required]
    });
    this.cardService.getCard(cardId)
      .subscribe( data => {
        this.editCardForm.setValue(data);
      });
  }

  onSubmit() {
    this.cardService.editCard(this.editCardForm.value)
      .subscribe(() => {
        this.snackBar.open('Card is updated!', '', {
          duration: 1500,
        });
      }, error => this.snackBar.open('Error: ' + error, '', {
          duration: 1500,
        })
      );
  }
}
