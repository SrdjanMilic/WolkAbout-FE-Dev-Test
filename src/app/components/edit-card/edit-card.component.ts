import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.sass']
})
export class EditCardComponent implements OnInit, OnDestroy {
  card: Card;
  selectedId: number;
  editCardForm: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(public cardService: CardService, private fb: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedId = this.route.snapshot.params.id;

    this.editCardForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      image: ['', Validators.required],
      path: ['', Validators.required],
      unitSymbol: ['', Validators.required],
      value: ['', Validators.required],
      lastUpdate: [''],
      type: ['', Validators.required]
    });

    this.subscriptions.push(this.cardService.getCard(this.selectedId)
      .subscribe(data => {
        console.log(data);
        this.card = data;
        this.editCardForm.setValue({
          id: this.card.id,
          name: this.card.name,
          image: this.card.image,
          path: this.card.path,
          unitSymbol: this.card.unitSymbol,
          value: this.card.value,
          lastUpdate: this.card.lastUpdate,
          type: this.card.type
        });
      })
    );

    console.log('SUBSCRIPTION ' + this.subscriptions);
  }

  onSubmit() {
    // Get edit time
    this.editCardForm.patchValue({
      lastUpdate: Date.now()
    });
    this.subscriptions.push(this.cardService.editCard(this.selectedId, this.editCardForm.value));
    console.log('SUBSCRIPTION ' + this.subscriptions);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
