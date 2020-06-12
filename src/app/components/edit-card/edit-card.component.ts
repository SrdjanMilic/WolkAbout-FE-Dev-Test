import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.sass']
})
export class EditCardComponent implements OnInit {

  constructor(public cardsService: CardsService, private fb: FormBuilder) { }

  editCardForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    path: ['', Validators.required],
    value: ['', Validators.required],
    unitSymbol: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.cardsService.editCard(this.editCardForm.value);
    console.log(`${JSON.stringify(this.editCardForm.value)}`);
  }
}
