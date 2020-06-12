import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.sass']
})
export class AddCardComponent implements OnInit {

  constructor(public cardsService: CardsService, private fb: FormBuilder) { }

  createCardForm = this.fb.group({
    name: ['', Validators.required],
    path: ['', Validators.required],
    value: ['', Validators.required],
    unitSymbol: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.cardsService.createCard(this.createCardForm.value);
    console.log(`${JSON.stringify(this.createCardForm.value)}`);
  }

}
