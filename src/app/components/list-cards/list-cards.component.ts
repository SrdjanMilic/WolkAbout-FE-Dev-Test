import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../../services/card.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.sass']
})
export class ListCardsComponent implements OnInit, OnDestroy {

  // Search filter term variable
  term: string;

  // Change view state
  viewState = false;

  cards$: Array<object>;

  // Variable to store all subscriptions
  private subscriptions: Subscription[] = [];

  constructor(public cardService: CardService, private dialog: MatDialog,
              private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.cardService.getCardList();
    this.subscriptions.push(this.cardService.cardsSource$.subscribe((res: Array<object>) => {
      this.cards$ = res;
      this.spinner.hide();
      console.log('CARDS ', this.cards$);
    }));
    const viewState = window.localStorage.getItem('View');
    // Convert boolean to string
    const boolValue = (viewState === 'true');
    this.viewState = boolValue;
    console.log('LIST_SUBSCRIPTION ' + this.subscriptions);
    console.log(this.viewState);
  }

  editCard(id: number) {
    this.router.navigate(['/edit-card', id]);
  }

  deleteCardDialog(id: number) {
    // call modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px',
      data: {
        title: 'Delete card',
        message: 'Are you sure you want to delete this card?'
      }
    });

    // listen to response
    this.subscriptions.push(dialogRef.afterClosed().subscribe(dialogResult => {
      // if user pressed yes dialogResult will be true
      // if he pressed no, it will be false
      if (dialogResult) {
        this.cards$ = [...this.cards$].filter((e: Card) => e.id !== id);
        this.subscriptions.push(this.cardService.deleteCard(id));
      }
      console.log(dialogResult);
      console.log('DIALOG_SUBSCRIPTION ' + this.subscriptions);
    }));
  }

  toggleView() {
    this.viewState = !this.viewState;
    window.localStorage.setItem('View', this.viewState.toString());
    console.log(this.viewState);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
