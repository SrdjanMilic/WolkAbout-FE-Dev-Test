import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../../services/card.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.sass']
})
export class AddCardComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  createCardForm: FormGroup;

  constructor(public cardsService: CardService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createCardForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      image: ['', Validators.required],
      path: ['', Validators.required],
      unitSymbol: ['', Validators.required],
      value: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit() {
    this.subscription = this.cardsService.addCard(this.createCardForm.value);
    console.log('ADD_SUBSCRIPTION ' + this.subscription);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
