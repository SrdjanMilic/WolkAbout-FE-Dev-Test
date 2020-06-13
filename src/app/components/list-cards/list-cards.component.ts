import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.sass']
})
export class ListCardsComponent implements OnInit {
  // Search filter term variable
  term: string;

  constructor(public cardService: CardService, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cardService.listCards()
      .subscribe((res: any[]) => {
        this.cardService.data = res;
        console.log(this.cardService.data);
      }, error => console.log(error));
  }

  removeCard(id: number) {
    // call modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px',
      data: {
        title: 'Delete card',
        message: 'Are you sure you want to delete this card?'
      }
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      // if user pressed yes dialogResult will be true
      // if he pressed no, it will be false
      if (dialogResult) {
        this.cardService.deleteCard(id)
          .subscribe((res: any[]) => {
            this.cardService.data = this.cardService.data.filter((e: any) => e.id !== id);
            this.snackBar.open('Card is deleted!', '', {
              duration: 2000,
            });
            console.log(res);
          });
      }
      console.log(dialogResult);
    });
  }
}
