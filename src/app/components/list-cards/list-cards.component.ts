import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../../services/card.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.sass']
})
export class ListCardsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  // Search filter term variable
  term: string;
  checked = false;

  constructor(public cardService: CardService, private dialog: MatDialog) { }

  ngOnInit(): void {
    window.localStorage.removeItem('cardId');
    this.subscriptions.push(this.cardService.listCards());
    console.log('LIST_SUBSCRIPTION ' + this.subscriptions);
  }

  editCard(id: number) {
    window.localStorage.setItem('cardId', id.toString());
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
        this.subscriptions.push(this.cardService.deleteCard(id));
        this.cardService.cards = this.cardService.cards.filter((e: any) => e.id !== id);
      }
      console.log(dialogResult);
      console.log('DIALOG_SUBSCRIPTION ' + this.subscriptions);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
